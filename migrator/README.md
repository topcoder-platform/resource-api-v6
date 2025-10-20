  # Topcoder Resources Data Migration Tool

  This tool is designed to **migrate data from DynamoDB (JSON format) to PostgreSQL** using **Prisma ORM**. It covers five key models of the Topcoder Resources API:

  - `ResourceRole`
  - `ResourceRolePhaseDependency`
  - `Resource`

  ## 📦 Technologies Used
  - **Node.js** (backend scripting)
  - **Prisma ORM** (PostgreSQL schema management)
  - **PostgreSQL 16.3** (Dockerized database)
  - **Docker & Docker Compose** (for DB setup)
  - **stream-json / readline** (for streaming JSON migration)
  - **Jest** (unit testing framework)

  ## ⚙️ Environment Configuration
  Create a `.env` file in the root directory:

  ```env
  DATABASE_URL="postgresql://postgres:postgres@localhost:5432/resourcesdb"
  CREATED_BY="resources-api-db-migration"
  ```

  > The `CREATED_BY` field can be overridden at runtime:
  ```bash
  CREATED_BY=eduardo node src/index.js member-stats ./data/MemberStats_test.json
  ```

  ## 🚀 How to Run

  This tool expects a running PostgreSQL instance defined in `docker-compose.yml`.

  1. Clone the repo and install dependencies:

  ```bash
  npm install
  ```

  2. Start PostgreSQL with Docker Compose:

  ```bash
  docker-compose up -d
  ```

  To tear it down completely (including the volume):

  ```bash
  docker-compose down -v
  ```

  > The database runs on port `5432` with credentials `postgres:postgres`, and is mapped to `resourcesdb`.

  3. Push the Prisma schema to the database:

  ```bash
  npx prisma db push
  ```

  4. Run a migration step (with optional file override):

  ```bash
  node src/index.js member-stats
  node src/index.js resources ./data/challenge-api.resources.json
  ```

  You can override the default `createdBy` value:

  ```bash
  CREATED_BY=my-migrator node src/index.js member-profiles
  ```

  ## 🕒 Incremental Migration with Start Date

  The `--start-date` parameter unlocks incremental migrations by filtering records on their creation and update timestamps. Run a full import in advance, then rerun with a start date to pick up only the recent changes—keeping the final cut-over fast and predictable.

  ### 🛠️ Usage Examples

  ```bash
  node src/index.js resources ./data/challenge-api.resources.json --start-date=2024-01-15
  node src/index.js resource-roles --start-date=2024-03-01
  node src/migrateAll.js --start-date=2024-02-20
  ```

  ### 🔍 Filtering Behavior

  - Records are imported when `created`/`createdAt` **or** `updatedAt` is on or after the provided start date
  - Records missing **both** date fields are skipped when a start date is supplied
  - Records with both date fields present but older than the start date are skipped
  - Dates must use the ISO `YYYY-MM-DD` format
  - Without `--start-date`, all records are imported (default behavior)

  ### 🔄 Incremental Migration Workflow

  1. **Bulk load ahead of time (Jan 1)** — seed the database without a start date:

     ```bash
     node src/migrateAll.js
     ```

  2. **Wait until the cut-over window (Mar 15)** — allow upstream systems to keep producing data as usual.

  3. **Refresh with recent updates** — bring the target in sync by importing only records touched since Jan 1:

     ```bash
     node src/migrateAll.js --start-date=2024-01-01
     ```

     This staggered approach turns a multi-hour bulk migration into a quick incremental catch-up that typically completes in minutes.

  ### 📌 Model Support

  - `resources`: filters on `created` and `updatedAt`
  - `resource-roles`: filters on `createdAt` and `updatedAt`
  - `resource-role-phase-dependencies`: filters on `createdAt` and `updatedAt`

  ## 🧩 Available Migration Steps

  | Step                                | Auto Strategy | Start Date Support | Description                                                                                       |
  |-------------------------------------|---------------|--------------------|---------------------------------------------------------------------------------------------------|
  | `member-profiles`                  | ✅            | ❌                 | Auto strategy: uses `stream-json` (batch) for files larger than 3MB, and `loadJSON` (simple) otherwise |
  | `member-stats`                     | ✅            | ❌                 | Auto strategy: uses `stream-json` (batch) for files larger than 3MB, and `loadJSON` (simple) otherwise |
  | `resource-roles`                   | ❌            | ✅                 | Simple in-memory migration using `loadJSON`, not expected to be large                             |
  | `resource-role-phase-dependencies` | ❌            | ✅                 | Simple in-memory migration using `loadJSON`, not expected to be large                             |
  | `resources`                        | ✅            | ✅                 | Auto strategy for NDJSON files: uses `readline` + batch for files > 3 MB, otherwise simple line-by-line       |

  > ⚙️ **Why Auto Strategy?**
>
> For models that involve large datasets (`member-profiles`, `member-stats`, and `resources`), the tool implements an **automatic selection strategy** based on file size:
> - If the input file is **larger than 3 MB**, the migration runs in **batch mode using streaming (e.g., `stream-json` or `readline`)** to reduce memory usage.
> - For **smaller files**, it defaults to **simple in-memory processing** (`loadJSON`) for faster performance.
>
> This approach ensures optimal balance between **efficiency** and **stability**, especially when working with hundreds of thousands of records (e.g., over 850,000 for MemberProfile).

  ### 📁 Default Input Files per Migration Step

  The following files are used by default for each step, unless a custom path is provided via the CLI:

  | Step                                | Default File Path                                             |
  |-------------------------------------|----------------------------------------------------------------|
  | `resource-roles`                   | `./data/ResourceRole_dynamo_data.json`                        |
  | `resource-role-phase-dependencies` | `./data/ResourceRolePhaseDependency_dynamo_data.json`         |
  | `resources`                        | `./data/Resource_data.json` ← requires NDJSON format          |

  💡 **Note:** If you're using the original ElasticSearch export file (`challenge-api.resources.json`) provided in the forum ([link here](https://drive.google.com/file/d/1F8YW-fnKjn8tt5a0_Z-QenZIHPiP3RK7/view?usp=sharing)), you must explicitly provide its path when running the migration:

  ```bash
  node src/index.js resources ./data/challenge-api.resources.json
  ```

### 🔁 Run All Migrations at Once

You can now run all migration steps sequentially using the following script:

```bash
node src/migrateAll.js
node src/migrateAll.js --start-date=2024-01-15
```

This script will automatically execute each step in order (`resource-roles`, `resource-role-phase-dependencies`, `resources`), logging progress and duration for each. When provided, the start date is passed to every step, so only records touched on or after the target date are processed—ideal for full imports followed by a quick incremental catch-up in one command.

  ## 📒 Error Logs
  All failed migrations are logged under the `logs/` folder by model:

  - `logs/rrpd_errors.log` ← from `ResourceRolePhaseDependency_dynamo_data.json` *(17 migrations failed)*

  > ✅ Most migrations complete successfully. Errors are logged for further review and debugging.

  ## ✅ Verification
  You can verify successful migration with simple SQL queries, for example:
  ```sql
  SELECT COUNT(*) FROM "Resource";
  ```
  To connect:
  ```bash
  docker exec -it resources_postgres psql -U postgres -d resourcesdb
  ```

  ## 📸 Screenshots
  See `/docs/` for evidence of a fully mounted database.
  ![Screenshot from 2025-04-14 16-58-20](https://github.com/user-attachments/assets/8fb66fb8-3db1-4b51-bb29-c1db7b207689)

  ## 🧪 Testing

  Run all test suites with:

  ```bash
  npm test
  ```

  Each migrator has a corresponding unit test with mock input files under `src/test/mocks/`. Jest is used as the testing framework.

  ---

### 📂 Data Files Not Included

The official DynamoDB dataset files provided in the forum (e.g., `challenge-api.resources.json`, etc.) are **not included** in this submission due to size constraints.

Please download them manually from the official challenge forum and place them under the `/data/` directory.

🔗 [Official Data Files (Google Drive)](https://drive.google.com/file/d/1F8YW-fnKjn8tt5a0_Z-QenZIHPiP3RK7/view?usp=sharing)

> 🧪 This project **includes lightweight mock data files** under `src/test/mocks/` for testing purposes and sample execution. Full data is only required for production migration.

  ---

  ✅ All requirements of the challenge have been implemented, including logs, unit tests, schema adherence, and configurability.


## 🔧 Integrated Fixes & Enhancements

Several improvements and refinements have been implemented throughout the migration tool to ensure performance, reliability, and clarity:

### ✅ Progress Bar for Batch Processes

A custom CLI progress bar was added using `utils/progressLogger.js`. This applies only to **batch-based migrations**, and provides a visual representation of migration progress based on the total number of records or batches processed:
- Implemented for: `resources`
- Skipped for small or in-memory migrations like `resource-roles` and `resource-role-phase-dependencies`

### ✅ Validation for All Models

Additional validation scripts were also developed for:
- `Resource`
- `ResourceRole`
- `ResourceRolePhaseDependency`

While binary search was not applicable for these due to non-numeric or unordered IDs, the validation was still efficiently implemented using `Map`-based lookups with the `id` as the key.

### ✅ Cleaner Code & Utility Reuse

A reusable utility module `utils/batchMigrator.js` was created to consolidate the logic for:
- Streamed reading of large JSON and NDJSON files
- Batch-based record processing with `Promise.allSettled`
- Progress tracking and error logging
- Automatic detection of input format size

This approach:
- Avoids code duplication
- Allows for consistent logging and error handling
- Simplifies future extensions

### ✅ Default Field Logic (createdAt, updatedAt, etc.)

- Fields like `createdAt`, `updatedAt`, `createdBy`, and `updatedBy` are now conditionally set based on whether values exist in the original JSON.
- If `updatedAt` or `updatedBy` are missing from the source, they are explicitly set to `null`, rather than omitted or auto-filled—ensuring data integrity.

### ✅ FullAccess Compatibility Fix

In `ResourceRole`, the original dataset sometimes includes only a `fullAccess` flag instead of `fullReadAccess` or `fullWriteAccess`.

Logic was added to:
- Derive `fullReadAccess` and `fullWriteAccess` from `fullAccess` when the specific fields are missing.
- Ensure fallback to `.env` defaults only if neither are provided.

```js
const fullReadAccess = role.fullReadAccess ?? (role.fullAccess ?? DEFAULT_READ_ACCESS);
const fullWriteAccess = role.fullWriteAccess ?? (role.fullAccess ?? DEFAULT_WRITE_ACCESS);
```

> 🚩 **Important Note:** Some records in the source data had `fullWriteAccess: true` but `fullReadAccess: false`, which is logically inconsistent. This was **not auto-corrected**, but a warning was added in the README for awareness during validation.

### 📄 Validation Logs

All validation scripts write their outputs and mismatches to `console.log`. You can redirect them to a file using:

```bash
node src/validation/validateMemberProfiles.js > logs/memberprofile_validation.log
```

---

