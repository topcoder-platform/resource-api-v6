-- CreateIndex
CREATE INDEX idx_resource_created_member ON resources."Resource"("createdAt" DESC, "memberId");
