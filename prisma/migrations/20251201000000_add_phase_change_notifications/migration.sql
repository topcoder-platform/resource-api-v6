-- Add phaseChangeNotifications flag to Resource
ALTER TABLE "Resource" ADD COLUMN "phaseChangeNotifications" BOOLEAN;
ALTER TABLE "Resource" ALTER COLUMN "phaseChangeNotifications" SET DEFAULT TRUE;
