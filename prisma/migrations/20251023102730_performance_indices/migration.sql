-- CreateIndex
CREATE INDEX "resource-roleId-index" ON "resources"."Resource"("roleId");

-- CreateIndex
CREATE INDEX "resource-memberIdChallengeId-index" ON "resources"."Resource"("memberId", "challengeId");

-- CreateIndex
CREATE INDEX "resourcerole-isActive-index" ON "resources"."ResourceRole"("isActive");

-- CreateIndex
CREATE INDEX "resourcerole-isActiveSelfObtainable-index" ON "resources"."ResourceRole"("isActive", "selfObtainable");

-- CreateIndex
CREATE INDEX "resourcerolephasedependency-resourceRoleId-index" ON "resources"."ResourceRolePhaseDependency"("resourceRoleId");
