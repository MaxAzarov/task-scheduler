//  https://api.atlassian.com/oauth/token/accessible-resources
// Authorization: Bearer ACCESS_TOKEN

// response
// [
//   {
//     id: "b4b183ca-07ab-4c7d-84ab-c82f27feff89",
//     url: "https://maxazarov.atlassian.net",
//     name: "maxazarov",
//     scopes: [
//       "read:issue:jira-software",
//       "read:issue:jira",
//       "read:project:jira",
//       "read:user:jira",
//       "read:user.property:jira"
//     ],
//     avatarUrl:
//       "https://site-admin-avatar-cdn.prod.public.atl-paas.net/avatars/240/jersey.png"
//   }
// ];

//
// get projects
// https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/project
//
// [
//   {
//     expand: "description,lead,issueTypes,url,projectKeys,permissions,insight",
//     self: "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/project/10000",
//     id: "10000",
//     key: "ST",
//     name: "super-team",
//     avatarUrls: {
//       "48x48":
//         "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/project/avatar/10407",
//       "24x24":
//         "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/project/avatar/10407?size=small",
//       "16x16":
//         "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/project/avatar/10407?size=xsmall",
//       "32x32":
//         "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/project/avatar/10407?size=medium"
//     },
//     projectTypeKey: "software",
//     simplified: true,
//     style: "next-gen",
//     isPrivate: false,
//     properties: {},
//     entityId: "7687c2cf-ee33-405f-a11b-356ee9b0733c",
//     uuid: "7687c2cf-ee33-405f-a11b-356ee9b0733c"
//   }
// ];

// get all boards
// https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/agile/1.0/board
// {
//     "maxResults": 50,
//     "startAt": 0,
//     "total": 1,
//     "isLast": true,
//     "values": [
//         {
//             "id": 1,
//             "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/agile/1.0/board/1",
//             "name": "ST board",
//             "type": "simple",
//             "location": {
//                 "projectId": 10000,
//                 "displayName": "super-team (ST)",
//                 "projectName": "super-team",
//                 "projectKey": "ST",
//                 "projectTypeKey": "software",
//                 "avatarURI": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/project/avatar/10407?size=small",
//                 "name": "super-team (ST)"
//             }
//         }
//     ]
// }

// get issues from board
// https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/agile/1.0/board/1/issue
// {
//     "expand": "schema,names",
//     "startAt": 0,
//     "maxResults": 50,
//     "total": 5,
//     "issues": [
//         {
//             "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
//             "id": "10000",
//             "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/agile/1.0/issue/10000",
//             "key": "ST-1",
//             "fields": {
//                 "statuscategorychangedate": "2022-03-07T16:32:50.027+0200",
//                 "issuetype": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/issuetype/10001",
//                     "id": "10001",
//                     "description": "Tasks track small, distinct pieces of work.",
//                     "iconUrl": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium",
//                     "name": "Task",
//                     "subtask": false,
//                     "avatarId": 10318,
//                     "entityId": "aac0ae2b-aaa9-4cc3-86f4-ed3ea783db88",
//                     "hierarchyLevel": 0
//                 },
//                 "timespent": null,
//                 "sprint": null,
//                 "project": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/project/10000",
//                     "id": "10000",
//                     "key": "ST",
//                     "name": "super-team",
//                     "projectTypeKey": "software",
//                     "simplified": true,
//                     "avatarUrls": {
//                         "48x48": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/project/avatar/10407",
//                         "24x24": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/project/avatar/10407?size=small",
//                         "16x16": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/project/avatar/10407?size=xsmall",
//                         "32x32": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/project/avatar/10407?size=medium"
//                     }
//                 },
//                 "fixVersions": [],
//                 "aggregatetimespent": null,
//                 "resolution": null,
//                 "resolutiondate": null,
//                 "workratio": -1,
//                 "lastViewed": "2022-03-08T17:12:55.266+0200",
//                 "watches": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/issue/ST-1/watchers",
//                     "watchCount": 1,
//                     "isWatching": true
//                 },
//                 "issuerestriction": {
//                     "issuerestrictions": {},
//                     "shouldDisplay": true
//                 },
//                 "created": "2022-03-07T16:32:49.668+0200",
//                 "customfield_10020": null,
//                 "customfield_10021": null,
//                 "epic": null,
//                 "customfield_10022": null,
//                 "customfield_10023": null,
//                 "priority": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/priority/3",
//                     "iconUrl": "https://maxazarov.atlassian.net/images/icons/priorities/medium.svg",
//                     "name": "Medium",
//                     "id": "3"
//                 },
//                 "customfield_10024": null,
//                 "customfield_10025": null,
//                 "labels": [],
//                 "customfield_10016": null,
//                 "customfield_10017": null,
//                 "customfield_10018": {
//                     "hasEpicLinkFieldDependency": false,
//                     "showField": false,
//                     "nonEditableReason": {
//                         "reason": "PLUGIN_LICENSE_ERROR",
//                         "message": "The Parent Link is only available to Jira Premium users."
//                     }
//                 },
//                 "customfield_10019": "0|hzzzzz:",
//                 "aggregatetimeoriginalestimate": null,
//                 "timeestimate": null,
//                 "versions": [],
//                 "issuelinks": [],
//                 "assignee": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/user?accountId=5dd70c059d79ad0ef53a42b1",
//                     "accountId": "5dd70c059d79ad0ef53a42b1",
//                     "emailAddress": "volodor05412@gmail.com",
//                     "avatarUrls": {
//                         "48x48": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "24x24": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "16x16": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "32x32": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png"
//                     },
//                     "displayName": "Максим Азаров",
//                     "active": true,
//                     "timeZone": "Europe/Kiev",
//                     "accountType": "atlassian"
//                 },
//                 "updated": "2022-03-08T17:12:57.971+0200",
//                 "status": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/status/10000",
//                     "description": "",
//                     "iconUrl": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/",
//                     "name": "To Do",
//                     "id": "10000",
//                     "statusCategory": {
//                         "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/statuscategory/2",
//                         "id": 2,
//                         "key": "new",
//                         "colorName": "blue-gray",
//                         "name": "To Do"
//                     }
//                 },
//                 "components": [],
//                 "timeoriginalestimate": null,
//                 "description": null,
//                 "customfield_10010": null,
//                 "customfield_10014": null,
//                 "customfield_10015": null,
//                 "timetracking": {},
//                 "customfield_10005": null,
//                 "customfield_10006": null,
//                 "security": null,
//                 "customfield_10007": null,
//                 "customfield_10008": null,
//                 "attachment": [],
//                 "customfield_10009": null,
//                 "aggregatetimeestimate": null,
//                 "flagged": false,
//                 "summary": "create some functionality",
//                 "creator": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/user?accountId=5dd70c059d79ad0ef53a42b1",
//                     "accountId": "5dd70c059d79ad0ef53a42b1",
//                     "emailAddress": "volodor05412@gmail.com",
//                     "avatarUrls": {
//                         "48x48": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "24x24": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "16x16": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "32x32": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png"
//                     },
//                     "displayName": "Максим Азаров",
//                     "active": true,
//                     "timeZone": "Europe/Kiev",
//                     "accountType": "atlassian"
//                 },
//                 "subtasks": [],
//                 "reporter": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/user?accountId=5dd70c059d79ad0ef53a42b1",
//                     "accountId": "5dd70c059d79ad0ef53a42b1",
//                     "emailAddress": "volodor05412@gmail.com",
//                     "avatarUrls": {
//                         "48x48": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "24x24": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "16x16": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "32x32": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png"
//                     },
//                     "displayName": "Максим Азаров",
//                     "active": true,
//                     "timeZone": "Europe/Kiev",
//                     "accountType": "atlassian"
//                 },
//                 "customfield_10000": "{}",
//                 "aggregateprogress": {
//                     "progress": 0,
//                     "total": 0
//                 },
//                 "customfield_10001": null,
//                 "customfield_10002": null,
//                 "customfield_10003": null,
//                 "customfield_10004": null,
//                 "environment": null,
//                 "duedate": null,
//                 "progress": {
//                     "progress": 0,
//                     "total": 0
//                 },
//                 "comment": {
//                     "comments": [],
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/issue/10000/comment",
//                     "maxResults": 0,
//                     "total": 0,
//                     "startAt": 0
//                 },
//                 "votes": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/issue/ST-1/votes",
//                     "votes": 0,
//                     "hasVoted": false
//                 },
//                 "worklog": {
//                     "startAt": 0,
//                     "maxResults": 20,
//                     "total": 0,
//                     "worklogs": []
//                 }
//             }
//         },
//         {
//             "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
//             "id": "10001",
//             "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/agile/1.0/issue/10001",
//             "key": "ST-2",
//             "fields": {
//                 "statuscategorychangedate": "2022-03-07T16:33:07.738+0200",
//                 "issuetype": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/issuetype/10001",
//                     "id": "10001",
//                     "description": "Tasks track small, distinct pieces of work.",
//                     "iconUrl": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium",
//                     "name": "Task",
//                     "subtask": false,
//                     "avatarId": 10318,
//                     "entityId": "aac0ae2b-aaa9-4cc3-86f4-ed3ea783db88",
//                     "hierarchyLevel": 0
//                 },
//                 "timespent": null,
//                 "sprint": null,
//                 "project": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/project/10000",
//                     "id": "10000",
//                     "key": "ST",
//                     "name": "super-team",
//                     "projectTypeKey": "software",
//                     "simplified": true,
//                     "avatarUrls": {
//                         "48x48": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/project/avatar/10407",
//                         "24x24": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/project/avatar/10407?size=small",
//                         "16x16": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/project/avatar/10407?size=xsmall",
//                         "32x32": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/project/avatar/10407?size=medium"
//                     }
//                 },
//                 "fixVersions": [],
//                 "aggregatetimespent": null,
//                 "resolution": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/resolution/10000",
//                     "id": "10000",
//                     "description": "Work has been completed on this issue.",
//                     "name": "Done"
//                 },
//                 "resolutiondate": "2022-03-07T16:33:07.729+0200",
//                 "workratio": -1,
//                 "lastViewed": null,
//                 "issuerestriction": {
//                     "issuerestrictions": {},
//                     "shouldDisplay": true
//                 },
//                 "watches": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/issue/ST-2/watchers",
//                     "watchCount": 1,
//                     "isWatching": true
//                 },
//                 "created": "2022-03-07T16:33:04.304+0200",
//                 "customfield_10020": null,
//                 "customfield_10021": null,
//                 "epic": null,
//                 "customfield_10022": null,
//                 "priority": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/priority/3",
//                     "iconUrl": "https://maxazarov.atlassian.net/images/icons/priorities/medium.svg",
//                     "name": "Medium",
//                     "id": "3"
//                 },
//                 "customfield_10023": null,
//                 "customfield_10024": null,
//                 "customfield_10025": "10000_*:*_1_*:*_2309_*|*_10002_*:*_1_*:*_0_*|*_10001_*:*_1_*:*_1143",
//                 "labels": [],
//                 "customfield_10016": null,
//                 "customfield_10017": null,
//                 "customfield_10018": {
//                     "hasEpicLinkFieldDependency": false,
//                     "showField": false,
//                     "nonEditableReason": {
//                         "reason": "PLUGIN_LICENSE_ERROR",
//                         "message": "The Parent Link is only available to Jira Premium users."
//                     }
//                 },
//                 "customfield_10019": "0|i00007:",
//                 "timeestimate": null,
//                 "aggregatetimeoriginalestimate": null,
//                 "versions": [],
//                 "issuelinks": [],
//                 "assignee": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/user?accountId=5dd70c059d79ad0ef53a42b1",
//                     "accountId": "5dd70c059d79ad0ef53a42b1",
//                     "emailAddress": "volodor05412@gmail.com",
//                     "avatarUrls": {
//                         "48x48": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "24x24": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "16x16": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "32x32": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png"
//                     },
//                     "displayName": "Максим Азаров",
//                     "active": true,
//                     "timeZone": "Europe/Kiev",
//                     "accountType": "atlassian"
//                 },
//                 "updated": "2022-03-08T17:13:18.934+0200",
//                 "status": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/status/10002",
//                     "description": "",
//                     "iconUrl": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/",
//                     "name": "Done",
//                     "id": "10002",
//                     "statusCategory": {
//                         "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/statuscategory/3",
//                         "id": 3,
//                         "key": "done",
//                         "colorName": "green",
//                         "name": "Done"
//                     }
//                 },
//                 "components": [],
//                 "timeoriginalestimate": null,
//                 "description": null,
//                 "customfield_10010": null,
//                 "customfield_10014": null,
//                 "customfield_10015": null,
//                 "timetracking": {},
//                 "customfield_10005": null,
//                 "customfield_10006": null,
//                 "security": null,
//                 "customfield_10007": null,
//                 "customfield_10008": null,
//                 "aggregatetimeestimate": null,
//                 "attachment": [],
//                 "customfield_10009": null,
//                 "flagged": false,
//                 "summary": "test one functionality",
//                 "creator": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/user?accountId=5dd70c059d79ad0ef53a42b1",
//                     "accountId": "5dd70c059d79ad0ef53a42b1",
//                     "emailAddress": "volodor05412@gmail.com",
//                     "avatarUrls": {
//                         "48x48": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "24x24": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "16x16": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "32x32": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png"
//                     },
//                     "displayName": "Максим Азаров",
//                     "active": true,
//                     "timeZone": "Europe/Kiev",
//                     "accountType": "atlassian"
//                 },
//                 "subtasks": [],
//                 "reporter": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/user?accountId=5dd70c059d79ad0ef53a42b1",
//                     "accountId": "5dd70c059d79ad0ef53a42b1",
//                     "emailAddress": "volodor05412@gmail.com",
//                     "avatarUrls": {
//                         "48x48": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "24x24": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "16x16": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "32x32": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png"
//                     },
//                     "displayName": "Максим Азаров",
//                     "active": true,
//                     "timeZone": "Europe/Kiev",
//                     "accountType": "atlassian"
//                 },
//                 "customfield_10000": "{}",
//                 "aggregateprogress": {
//                     "progress": 0,
//                     "total": 0
//                 },
//                 "customfield_10001": null,
//                 "customfield_10002": null,
//                 "customfield_10003": null,
//                 "customfield_10004": null,
//                 "environment": null,
//                 "duedate": null,
//                 "progress": {
//                     "progress": 0,
//                     "total": 0
//                 },
//                 "comment": {
//                     "comments": [],
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/issue/10001/comment",
//                     "maxResults": 0,
//                     "total": 0,
//                     "startAt": 0
//                 },
//                 "votes": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/issue/ST-2/votes",
//                     "votes": 0,
//                     "hasVoted": false
//                 },
//                 "worklog": {
//                     "startAt": 0,
//                     "maxResults": 20,
//                     "total": 0,
//                     "worklogs": []
//                 }
//             }
//         },
//         {
//             "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
//             "id": "10002",
//             "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/agile/1.0/issue/10002",
//             "key": "ST-3",
//             "fields": {
//                 "statuscategorychangedate": "2022-03-08T16:51:50.476+0200",
//                 "issuetype": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/issuetype/10001",
//                     "id": "10001",
//                     "description": "Tasks track small, distinct pieces of work.",
//                     "iconUrl": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium",
//                     "name": "Task",
//                     "subtask": false,
//                     "avatarId": 10318,
//                     "entityId": "aac0ae2b-aaa9-4cc3-86f4-ed3ea783db88",
//                     "hierarchyLevel": 0
//                 },
//                 "timespent": null,
//                 "sprint": null,
//                 "project": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/project/10000",
//                     "id": "10000",
//                     "key": "ST",
//                     "name": "super-team",
//                     "projectTypeKey": "software",
//                     "simplified": true,
//                     "avatarUrls": {
//                         "48x48": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/project/avatar/10407",
//                         "24x24": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/project/avatar/10407?size=small",
//                         "16x16": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/project/avatar/10407?size=xsmall",
//                         "32x32": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/project/avatar/10407?size=medium"
//                     }
//                 },
//                 "fixVersions": [],
//                 "aggregatetimespent": null,
//                 "resolution": null,
//                 "resolutiondate": null,
//                 "workratio": -1,
//                 "lastViewed": "2022-03-08T17:13:08.382+0200",
//                 "watches": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/issue/ST-3/watchers",
//                     "watchCount": 1,
//                     "isWatching": true
//                 },
//                 "issuerestriction": {
//                     "issuerestrictions": {},
//                     "shouldDisplay": true
//                 },
//                 "created": "2022-03-08T16:51:50.085+0200",
//                 "customfield_10020": null,
//                 "customfield_10021": null,
//                 "epic": null,
//                 "customfield_10022": null,
//                 "priority": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/priority/3",
//                     "iconUrl": "https://maxazarov.atlassian.net/images/icons/priorities/medium.svg",
//                     "name": "Medium",
//                     "id": "3"
//                 },
//                 "customfield_10023": null,
//                 "customfield_10024": null,
//                 "customfield_10025": null,
//                 "labels": [],
//                 "customfield_10016": null,
//                 "customfield_10017": null,
//                 "customfield_10018": {
//                     "hasEpicLinkFieldDependency": false,
//                     "showField": false,
//                     "nonEditableReason": {
//                         "reason": "PLUGIN_LICENSE_ERROR",
//                         "message": "The Parent Link is only available to Jira Premium users."
//                     }
//                 },
//                 "customfield_10019": "0|i0000f:",
//                 "timeestimate": null,
//                 "aggregatetimeoriginalestimate": null,
//                 "versions": [],
//                 "issuelinks": [],
//                 "assignee": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/user?accountId=5dd70c059d79ad0ef53a42b1",
//                     "accountId": "5dd70c059d79ad0ef53a42b1",
//                     "emailAddress": "volodor05412@gmail.com",
//                     "avatarUrls": {
//                         "48x48": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "24x24": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "16x16": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "32x32": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png"
//                     },
//                     "displayName": "Максим Азаров",
//                     "active": true,
//                     "timeZone": "Europe/Kiev",
//                     "accountType": "atlassian"
//                 },
//                 "updated": "2022-03-08T17:13:08.269+0200",
//                 "status": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/status/10000",
//                     "description": "",
//                     "iconUrl": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/",
//                     "name": "To Do",
//                     "id": "10000",
//                     "statusCategory": {
//                         "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/statuscategory/2",
//                         "id": 2,
//                         "key": "new",
//                         "colorName": "blue-gray",
//                         "name": "To Do"
//                     }
//                 },
//                 "components": [],
//                 "timeoriginalestimate": null,
//                 "description": null,
//                 "customfield_10010": null,
//                 "customfield_10014": null,
//                 "customfield_10015": null,
//                 "timetracking": {},
//                 "customfield_10005": null,
//                 "customfield_10006": null,
//                 "customfield_10007": null,
//                 "security": null,
//                 "customfield_10008": null,
//                 "aggregatetimeestimate": null,
//                 "attachment": [],
//                 "customfield_10009": null,
//                 "flagged": false,
//                 "summary": "test",
//                 "creator": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/user?accountId=5dd70c059d79ad0ef53a42b1",
//                     "accountId": "5dd70c059d79ad0ef53a42b1",
//                     "emailAddress": "volodor05412@gmail.com",
//                     "avatarUrls": {
//                         "48x48": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "24x24": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "16x16": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "32x32": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png"
//                     },
//                     "displayName": "Максим Азаров",
//                     "active": true,
//                     "timeZone": "Europe/Kiev",
//                     "accountType": "atlassian"
//                 },
//                 "subtasks": [],
//                 "reporter": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/user?accountId=5dd70c059d79ad0ef53a42b1",
//                     "accountId": "5dd70c059d79ad0ef53a42b1",
//                     "emailAddress": "volodor05412@gmail.com",
//                     "avatarUrls": {
//                         "48x48": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "24x24": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "16x16": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "32x32": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png"
//                     },
//                     "displayName": "Максим Азаров",
//                     "active": true,
//                     "timeZone": "Europe/Kiev",
//                     "accountType": "atlassian"
//                 },
//                 "aggregateprogress": {
//                     "progress": 0,
//                     "total": 0
//                 },
//                 "customfield_10000": "{}",
//                 "customfield_10001": null,
//                 "customfield_10002": null,
//                 "customfield_10003": null,
//                 "customfield_10004": null,
//                 "environment": null,
//                 "duedate": null,
//                 "progress": {
//                     "progress": 0,
//                     "total": 0
//                 },
//                 "votes": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/issue/ST-3/votes",
//                     "votes": 0,
//                     "hasVoted": false
//                 },
//                 "comment": {
//                     "comments": [],
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/issue/10002/comment",
//                     "maxResults": 0,
//                     "total": 0,
//                     "startAt": 0
//                 },
//                 "worklog": {
//                     "startAt": 0,
//                     "maxResults": 20,
//                     "total": 0,
//                     "worklogs": []
//                 }
//             }
//         },
//         {
//             "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
//             "id": "10003",
//             "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/agile/1.0/issue/10003",
//             "key": "ST-4",
//             "fields": {
//                 "statuscategorychangedate": "2022-03-08T16:51:58.129+0200",
//                 "issuetype": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/issuetype/10001",
//                     "id": "10001",
//                     "description": "Tasks track small, distinct pieces of work.",
//                     "iconUrl": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium",
//                     "name": "Task",
//                     "subtask": false,
//                     "avatarId": 10318,
//                     "entityId": "aac0ae2b-aaa9-4cc3-86f4-ed3ea783db88",
//                     "hierarchyLevel": 0
//                 },
//                 "timespent": null,
//                 "sprint": null,
//                 "project": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/project/10000",
//                     "id": "10000",
//                     "key": "ST",
//                     "name": "super-team",
//                     "projectTypeKey": "software",
//                     "simplified": true,
//                     "avatarUrls": {
//                         "48x48": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/project/avatar/10407",
//                         "24x24": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/project/avatar/10407?size=small",
//                         "16x16": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/project/avatar/10407?size=xsmall",
//                         "32x32": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/project/avatar/10407?size=medium"
//                     }
//                 },
//                 "fixVersions": [],
//                 "aggregatetimespent": null,
//                 "resolution": null,
//                 "resolutiondate": null,
//                 "workratio": -1,
//                 "issuerestriction": {
//                     "issuerestrictions": {},
//                     "shouldDisplay": true
//                 },
//                 "lastViewed": "2022-03-08T17:13:15.218+0200",
//                 "watches": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/issue/ST-4/watchers",
//                     "watchCount": 1,
//                     "isWatching": true
//                 },
//                 "created": "2022-03-08T16:51:56.246+0200",
//                 "customfield_10020": null,
//                 "customfield_10021": null,
//                 "epic": null,
//                 "customfield_10022": null,
//                 "priority": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/priority/3",
//                     "iconUrl": "https://maxazarov.atlassian.net/images/icons/priorities/medium.svg",
//                     "name": "Medium",
//                     "id": "3"
//                 },
//                 "customfield_10023": null,
//                 "customfield_10024": null,
//                 "customfield_10025": null,
//                 "labels": [],
//                 "customfield_10016": null,
//                 "customfield_10017": null,
//                 "customfield_10018": {
//                     "hasEpicLinkFieldDependency": false,
//                     "showField": false,
//                     "nonEditableReason": {
//                         "reason": "PLUGIN_LICENSE_ERROR",
//                         "message": "The Parent Link is only available to Jira Premium users."
//                     }
//                 },
//                 "customfield_10019": "0|i0000n:",
//                 "aggregatetimeoriginalestimate": null,
//                 "timeestimate": null,
//                 "versions": [],
//                 "issuelinks": [],
//                 "assignee": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/user?accountId=5dd70c059d79ad0ef53a42b1",
//                     "accountId": "5dd70c059d79ad0ef53a42b1",
//                     "emailAddress": "volodor05412@gmail.com",
//                     "avatarUrls": {
//                         "48x48": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "24x24": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "16x16": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "32x32": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png"
//                     },
//                     "displayName": "Максим Азаров",
//                     "active": true,
//                     "timeZone": "Europe/Kiev",
//                     "accountType": "atlassian"
//                 },
//                 "updated": "2022-03-08T17:13:14.387+0200",
//                 "status": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/status/10001",
//                     "description": "",
//                     "iconUrl": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/",
//                     "name": "In Progress",
//                     "id": "10001",
//                     "statusCategory": {
//                         "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/statuscategory/4",
//                         "id": 4,
//                         "key": "indeterminate",
//                         "colorName": "yellow",
//                         "name": "In Progress"
//                     }
//                 },
//                 "components": [],
//                 "timeoriginalestimate": null,
//                 "description": null,
//                 "customfield_10010": null,
//                 "customfield_10014": null,
//                 "timetracking": {},
//                 "customfield_10015": null,
//                 "customfield_10005": null,
//                 "customfield_10006": null,
//                 "customfield_10007": null,
//                 "security": null,
//                 "customfield_10008": null,
//                 "aggregatetimeestimate": null,
//                 "attachment": [],
//                 "customfield_10009": null,
//                 "flagged": false,
//                 "summary": "test4",
//                 "creator": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/user?accountId=5dd70c059d79ad0ef53a42b1",
//                     "accountId": "5dd70c059d79ad0ef53a42b1",
//                     "emailAddress": "volodor05412@gmail.com",
//                     "avatarUrls": {
//                         "48x48": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "24x24": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "16x16": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "32x32": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png"
//                     },
//                     "displayName": "Максим Азаров",
//                     "active": true,
//                     "timeZone": "Europe/Kiev",
//                     "accountType": "atlassian"
//                 },
//                 "subtasks": [],
//                 "reporter": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/user?accountId=5dd70c059d79ad0ef53a42b1",
//                     "accountId": "5dd70c059d79ad0ef53a42b1",
//                     "emailAddress": "volodor05412@gmail.com",
//                     "avatarUrls": {
//                         "48x48": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "24x24": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "16x16": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "32x32": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png"
//                     },
//                     "displayName": "Максим Азаров",
//                     "active": true,
//                     "timeZone": "Europe/Kiev",
//                     "accountType": "atlassian"
//                 },
//                 "aggregateprogress": {
//                     "progress": 0,
//                     "total": 0
//                 },
//                 "customfield_10000": "{}",
//                 "customfield_10001": null,
//                 "customfield_10002": null,
//                 "customfield_10003": null,
//                 "customfield_10004": null,
//                 "environment": null,
//                 "duedate": null,
//                 "progress": {
//                     "progress": 0,
//                     "total": 0
//                 },
//                 "votes": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/issue/ST-4/votes",
//                     "votes": 0,
//                     "hasVoted": false
//                 },
//                 "comment": {
//                     "comments": [],
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/issue/10003/comment",
//                     "maxResults": 0,
//                     "total": 0,
//                     "startAt": 0
//                 },
//                 "worklog": {
//                     "startAt": 0,
//                     "maxResults": 20,
//                     "total": 0,
//                     "worklogs": []
//                 }
//             }
//         },
//         {
//             "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
//             "id": "10004",
//             "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/agile/1.0/issue/10004",
//             "key": "ST-5",
//             "fields": {
//                 "statuscategorychangedate": "2022-03-08T17:01:31.872+0200",
//                 "issuetype": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/issuetype/10001",
//                     "id": "10001",
//                     "description": "Tasks track small, distinct pieces of work.",
//                     "iconUrl": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium",
//                     "name": "Task",
//                     "subtask": false,
//                     "avatarId": 10318,
//                     "entityId": "aac0ae2b-aaa9-4cc3-86f4-ed3ea783db88",
//                     "hierarchyLevel": 0
//                 },
//                 "timespent": null,
//                 "sprint": null,
//                 "project": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/project/10000",
//                     "id": "10000",
//                     "key": "ST",
//                     "name": "super-team",
//                     "projectTypeKey": "software",
//                     "simplified": true,
//                     "avatarUrls": {
//                         "48x48": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/project/avatar/10407",
//                         "24x24": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/project/avatar/10407?size=small",
//                         "16x16": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/project/avatar/10407?size=xsmall",
//                         "32x32": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/universal_avatar/view/type/project/avatar/10407?size=medium"
//                     }
//                 },
//                 "fixVersions": [],
//                 "aggregatetimespent": null,
//                 "resolution": null,
//                 "resolutiondate": null,
//                 "workratio": -1,
//                 "issuerestriction": {
//                     "issuerestrictions": {},
//                     "shouldDisplay": true
//                 },
//                 "watches": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/issue/ST-5/watchers",
//                     "watchCount": 1,
//                     "isWatching": true
//                 },
//                 "lastViewed": null,
//                 "created": "2022-03-08T17:01:31.539+0200",
//                 "customfield_10020": null,
//                 "customfield_10021": null,
//                 "epic": null,
//                 "customfield_10022": null,
//                 "priority": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/priority/3",
//                     "iconUrl": "https://maxazarov.atlassian.net/images/icons/priorities/medium.svg",
//                     "name": "Medium",
//                     "id": "3"
//                 },
//                 "customfield_10023": null,
//                 "customfield_10024": null,
//                 "customfield_10025": null,
//                 "labels": [],
//                 "customfield_10016": null,
//                 "customfield_10017": null,
//                 "customfield_10018": {
//                     "hasEpicLinkFieldDependency": false,
//                     "showField": false,
//                     "nonEditableReason": {
//                         "reason": "PLUGIN_LICENSE_ERROR",
//                         "message": "The Parent Link is only available to Jira Premium users."
//                     }
//                 },
//                 "customfield_10019": "0|i0000v:",
//                 "aggregatetimeoriginalestimate": null,
//                 "timeestimate": null,
//                 "versions": [],
//                 "issuelinks": [],
//                 "assignee": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/user?accountId=5dd70c059d79ad0ef53a42b1",
//                     "accountId": "5dd70c059d79ad0ef53a42b1",
//                     "emailAddress": "volodor05412@gmail.com",
//                     "avatarUrls": {
//                         "48x48": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "24x24": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "16x16": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "32x32": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png"
//                     },
//                     "displayName": "Максим Азаров",
//                     "active": true,
//                     "timeZone": "Europe/Kiev",
//                     "accountType": "atlassian"
//                 },
//                 "updated": "2022-03-08T17:13:22.839+0200",
//                 "status": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/status/10000",
//                     "description": "",
//                     "iconUrl": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/",
//                     "name": "To Do",
//                     "id": "10000",
//                     "statusCategory": {
//                         "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/statuscategory/2",
//                         "id": 2,
//                         "key": "new",
//                         "colorName": "blue-gray",
//                         "name": "To Do"
//                     }
//                 },
//                 "components": [],
//                 "timeoriginalestimate": null,
//                 "description": null,
//                 "customfield_10010": null,
//                 "customfield_10014": null,
//                 "timetracking": {},
//                 "customfield_10015": null,
//                 "customfield_10005": null,
//                 "customfield_10006": null,
//                 "customfield_10007": null,
//                 "security": null,
//                 "customfield_10008": null,
//                 "attachment": [],
//                 "aggregatetimeestimate": null,
//                 "customfield_10009": null,
//                 "flagged": false,
//                 "summary": "issue1",
//                 "creator": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/user?accountId=5dd70c059d79ad0ef53a42b1",
//                     "accountId": "5dd70c059d79ad0ef53a42b1",
//                     "emailAddress": "volodor05412@gmail.com",
//                     "avatarUrls": {
//                         "48x48": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "24x24": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "16x16": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "32x32": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png"
//                     },
//                     "displayName": "Максим Азаров",
//                     "active": true,
//                     "timeZone": "Europe/Kiev",
//                     "accountType": "atlassian"
//                 },
//                 "subtasks": [],
//                 "reporter": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/user?accountId=5dd70c059d79ad0ef53a42b1",
//                     "accountId": "5dd70c059d79ad0ef53a42b1",
//                     "emailAddress": "volodor05412@gmail.com",
//                     "avatarUrls": {
//                         "48x48": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "24x24": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "16x16": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png",
//                         "32x32": "https://secure.gravatar.com/avatar/29f1e75d43a9669b90a2eacf6688aa70?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-4.png"
//                     },
//                     "displayName": "Максим Азаров",
//                     "active": true,
//                     "timeZone": "Europe/Kiev",
//                     "accountType": "atlassian"
//                 },
//                 "customfield_10000": "{}",
//                 "aggregateprogress": {
//                     "progress": 0,
//                     "total": 0
//                 },
//                 "customfield_10001": null,
//                 "customfield_10002": null,
//                 "customfield_10003": null,
//                 "customfield_10004": null,
//                 "environment": null,
//                 "duedate": null,
//                 "progress": {
//                     "progress": 0,
//                     "total": 0
//                 },
//                 "votes": {
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/issue/ST-5/votes",
//                     "votes": 0,
//                     "hasVoted": false
//                 },
//                 "comment": {
//                     "comments": [],
//                     "self": "https://api.atlassian.com/ex/jira/b4b183ca-07ab-4c7d-84ab-c82f27feff89/rest/api/2/issue/10004/comment",
//                     "maxResults": 0,
//                     "total": 0,
//                     "startAt": 0
//                 },
//                 "worklog": {
//                     "startAt": 0,
//                     "maxResults": 20,
//                     "total": 0,
//                     "worklogs": []
//                 }
//             }
//         }
//     ]
// }

// exchange token
// curl --request POST \
//   --url 'https://auth.atlassian.com/oauth/token' \
//   --header 'Content-Type: application/json' \
//   --data '{ "grant_type": "refresh_token", "client_id": "YOUR_CLIENT_ID", "client_secret": "YOUR_CLIENT_SECRET", "refresh_token": "YOUR_REFRESH_TOKEN" }'
