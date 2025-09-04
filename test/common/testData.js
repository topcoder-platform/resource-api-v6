/*
 * Test data to be used in tests
 */

const token = {
  admin: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJUb3Bjb2RlciBVc2VyIiwiQ29ubmVjdCBTdXBwb3J0IiwiYWRtaW5pc3RyYXRvciIsInRlc3RSb2xlIiwiYWFhIiwidG9ueV90ZXN0XzEiLCJDb25uZWN0IE1hbmFnZXIiLCJDb25uZWN0IEFkbWluIiwiY29waWxvdCIsIkNvbm5lY3QgQ29waWxvdCBNYW5hZ2VyIl0sImlzcyI6Imh0dHBzOi8vYXBpLnRvcGNvZGVyLWRldi5jb20iLCJoYW5kbGUiOiJUb255SiIsImV4cCI6MTY4MTA1MjIxMSwidXNlcklkIjoiODU0Nzg5OSIsImlhdCI6MTU0OTc5MTYxMSwiZW1haWwiOiJ0amVmdHMrZml4QHRvcGNvZGVyLmNvbSIsImp0aSI6ImY5NGQxZTI2LTNkMGUtNDZjYS04MTE1LTg3NTQ1NDRhMDhmMSJ9.ONh2RSE5NeJzyjBD68TSUdNFMs5v5BXtga4LchR2x3s',
  diazz: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJUb3Bjb2RlciBVc2VyIl0sImlzcyI6Imh0dHBzOi8vYXBpLnRvcGNvZGVyLWRldi5jb20iLCJoYW5kbGUiOiJkaWF6eiIsImV4cCI6MTc4MjgwMDE2OSwidXNlcklkIjoiNDAxNTQ3ODIiLCJpYXQiOjE1NDk3OTk1NjksImVtYWlsIjoiZW1haWxAZG9tYWluLmNvbS56IiwianRpIjoiOWM0NTExYzUtYzE2NS00YTFiLTg5OWUtYjY1YWQwZTAyYjU1In0.xUOFlly1dpfinkR9t4y_QsrnoIykgzgx0q5u8Re-0Qw',
  phead: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJUb3Bjb2RlciBVc2VyIiwiY29waWxvdCJdLCJpc3MiOiJodHRwczovL2FwaS50b3Bjb2Rlci1kZXYuY29tIiwiaGFuZGxlIjoicGhlYWQiLCJleHAiOjE3ODE3OTIzNzAsInVzZXJJZCI6IjIyNzQyNzY0IiwiaWF0IjoxNTQ5NzkxNzcwLCJlbWFpbCI6ImVtYWlsQGRvbWFpbi5jb20ueiIsImp0aSI6ImYxZTYxM2JlLWQ1YjktNDIzMS1iYWFlLWVlOWYyZDIyNzIzNCJ9.jzmyU45yZbtu45u3IXIDG1cIpxWvGxUDPPFjC42s3YY',
  lunarkid: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJUb3Bjb2RlciBVc2VyIl0sImlzcyI6Imh0dHBzOi8vYXBpLnRvcGNvZGVyLWRldi5jb20iLCJoYW5kbGUiOiJsdW5hcmtpZCIsImV4cCI6MTc4MjgwMDE2OSwidXNlcklkIjoiMjI3MDY4NzMiLCJpYXQiOjE1NDk3OTk1NjksImVtYWlsIjoiZW1haWxAZG9tYWluLmNvbS56IiwianRpIjoiOWM0NTExYzUtYzE2NS00YTFiLTg5OWUtYjY1YWQwZTAyYjU1In0.Xe1ucyVBHmqWZO7kPW6JKeGr1GO2RfZcG0_MMfnD8B0',
  m2m: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RvcGNvZGVyLWRldi5hdXRoMC5jb20vIiwic3ViIjoiZW5qdzE4MTBlRHozWFR3U08yUm4yWTljUVRyc3BuM0JAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vbTJtLnRvcGNvZGVyLWRldi5jb20vIiwiaWF0IjoxNTUwOTA2Mzg4LCJleHAiOjE2ODA5OTI3ODgsImF6cCI6ImVuancxODEwZUR6M1hUd1NPMlJuMlk5Y1FUcnNwbjNCIiwic2NvcGUiOiJhbGw6cmVzb3VyY2VzIGFsbDpyZXNvdXJjZV9yb2xlcyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.UhuqMGrrNzj-VQz2-BogN28YZTE9uauIfdP7EOhrKB0',
  m2mRead: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RvcGNvZGVyLWRldi5hdXRoMC5jb20vIiwic3ViIjoiZW5qdzE4MTBlRHozWFR3U08yUm4yWTljUVRyc3BuM0JAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vbTJtLnRvcGNvZGVyLWRldi5jb20vIiwiaWF0IjoxNTUwOTA2Mzg4LCJleHAiOjE2ODA5OTI3ODgsImF6cCI6ImVuancxODEwZUR6M1hUd1NPMlJuMlk5Y1FUcnNwbjNCIiwic2NvcGUiOiJyZWFkOnJlc291cmNlcyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.1EdekIx1jU2lDSIXlMFCPmXkzLWQ_ZvxPuutQWuTKu0',
  m2mModify: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RvcGNvZGVyLWRldi5hdXRoMC5jb20vIiwic3ViIjoiZW5qdzE4MTBlRHozWFR3U08yUm4yWTljUVRyc3BuM0JAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vbTJtLnRvcGNvZGVyLWRldi5jb20vIiwiaWF0IjoxNTUwOTA2Mzg4LCJleHAiOjE2ODA5OTI3ODgsImF6cCI6ImVuancxODEwZUR6M1hUd1NPMlJuMlk5Y1FUcnNwbjNCIiwic2NvcGUiOiJjcmVhdGU6cmVzb3VyY2VzIGRlbGV0ZTpyZXNvdXJjZXMgdXBkYXRlOnJlc291cmNlcyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.f_3FLT3jMTnKwGIg8fcFP2lmShy5S9d5IvLNbXSj2Eo',
  expired: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJUb3Bjb2RlciBVc2VyIiwiQ29ubmVjdCBTdXBwb3J0IiwiYWRtaW5pc3RyYXRvciIsInRlc3RSb2xlIiwiYWFhIiwidG9ueV90ZXN0XzEiLCJDb25uZWN0IE1hbmFnZXIiLCJDb25uZWN0IEFkbWluIiwiY29waWxvdCIsIkNvbm5lY3QgQ29waWxvdCBNYW5hZ2VyIl0sImlzcyI6Imh0dHBzOi8vYXBpLnRvcGNvZGVyLWRldi5jb20iLCJoYW5kbGUiOiJUb255SiIsImV4cCI6MTU1MTA2MzIxMSwidXNlcklkIjoiODU0Nzg5OSIsImlhdCI6MTU1MTA1MzIxMSwiZW1haWwiOiJ0amVmdHMrZml4QHRvcGNvZGVyLmNvbSIsImp0aSI6ImY5NGQxZTI2LTNkMGUtNDZjYS04MTE1LTg3NTQ1NDRhMDhmMSJ9.97-pjuSGGqDAqK2FG2yi_3nmzB7ZMXQwtG0bi8_PlKk'
}

const user = {
  admin: {
    roles: [
      'Topcoder User',
      'Connect Support',
      'administrator',
      'testRole',
      'aaa',
      'tony_test_1',
      'Connect Manager',
      'Connect Admin',
      'copilot',
      'Connect Copilot Manager'
    ],
    iss: 'https://api.topcoder-dev.com',
    handle: 'TonyJ',
    exp: 1561052211,
    userId: '8547899',
    iat: 1549791611,
    email: 'tjefts+fix@topcoder.com',
    jti: 'f94d1e26-3d0e-46ca-8115-8754544a08f1'
  },
  diazz: {
    roles: [ 'Topcoder User' ],
    iss: 'https://api.topcoder-dev.com',
    handle: 'diazz',
    exp: 1562800169,
    userId: '40154782',
    iat: 1549799569,
    email: 'email@domain.com.z',
    jti: '9c4511c5-c165-4a1b-899e-b65ad0e02b55'
  },
  phead: {
    roles: [ 'Topcoder User', 'copilot' ],
    iss: 'https://api.topcoder-dev.com',
    handle: 'phead',
    exp: 1561792370,
    userId: '22742764',
    iat: 1549791770,
    email: 'email@domain.com.z',
    jti: 'f1e613be-d5b9-4231-baae-ee9f2d227234'
  },
  lunarkid: {
    roles: [ 'Topcoder User' ],
    iss: 'https://api.topcoder-dev.com',
    handle: 'lunarkid',
    exp: 1561792370,
    userId: '22706873',
    iat: 1549791770,
    email: 'email@domain.com.z',
    jti: 'f1e613be-d5b9-4231-baae-ee9f2d227234'
  },
  m2m: {
    iss: 'https://topcoder-dev.auth0.com/',
    sub: 'enjw1810eDz3XTwSO2Rn2Y9cQTrspn3B@clients',
    aud: 'https://m2m.topcoder-dev.com/',
    iat: 1550906388,
    exp: 1560992788,
    azp: 'enjw1810eDz3XTwSO2Rn2Y9cQTrspn3B',
    scope: 'all:resources all:resource_roles',
    gty: 'client-credentials',
    userId: null,
    scopes: [ 'all:resources', 'all:resource_roles' ],
    isMachine: true
  },
  m2mResources: {
    iss: 'https://topcoder-dev.auth0.com/',
    sub: 'enjw1810eDz3XTwSO2Rn2Y9cQTrspn3B@clients',
    aud: 'https://m2m.topcoder-dev.com/',
    iat: 1550906388,
    exp: 1560992788,
    azp: 'enjw1810eDz3XTwSO2Rn2Y9cQTrspn3B',
    scope: 'create:resources read:resources delete:resources',
    gty: 'client-credentials',
    userId: null,
    scopes: [ 'create:resources', 'read:resources', 'delete:resources' ],
    isMachine: true
  }
}

const requestBody = {
  resourceRoles: {
    stringFields: ['name'],
    booleanFields: ['fullReadAccess', 'fullWriteAccess', 'isActive', 'selfObtainable'],
    requiredFields: ['name', 'isActive', 'selfObtainable', 'fullReadAccess', 'fullWriteAccess'],
    testBody: {
      name: 'name',
      fullReadAccess: true,
      fullWriteAccess: true,
      isActive: true,
      selfObtainable: false
    },
    createBody: (name, fullReadAccess, fullWriteAccess, isActive, selfObtainable) => {
      return { name, fullReadAccess, fullWriteAccess, isActive, selfObtainable }
    }
  },
  resources: {
    stringFields: ['challengeId', 'memberHandle', 'roleId'],
    requiredFields: ['challengeId', 'memberHandle', 'roleId'],
    testBody: {
      challengeId: 'fe6d0a58-ce7d-4521-8501-b8132b1c0391',
      memberHandle: 'handle',
      roleId: 'fe6d0a58-ce7d-4521-8501-b8132b1c0391'
    },
    createBody: (memberHandle, roleId, challengeId) => {
      return { memberHandle, roleId, challengeId }
    }
  },
  resourceRolePhaseDependencies: {
    stringFields: ['phaseId', 'resourceRoleId'],
    booleanFields: ['phaseState'],
    requiredFields: ['phaseId', 'resourceRoleId', 'phaseState'],
    testBody: {
      phaseId: 'aa5a3f78-79e0-4bf7-93ff-b11e8f5b398b',
      resourceRoleId: 'fe6d0a58-ce7d-4521-8501-b8132b1c0391',
      phaseState: true
    },
    createBody: (phaseId, resourceRoleId, phaseState) => {
      return { phaseId, resourceRoleId, phaseState }
    }
  }
}

module.exports = {
  token,
  user,
  requestBody
}
