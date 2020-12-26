export const environment = {
  production: true,
  apiUrl:'https://algamoney-service.herokuapp.com',
  tokenWhitelistedDomains: [new RegExp('algamoney-service.herokuapp.com') ],
  tokenBlacklistedRoutes: [new RegExp('\/oauth\/token')]
};
