import {
    notFoundRoute,
    unauthorizedCompanyRoute,
    unauthorizedRoute
} from './error.routes';
import {
    accountRoutes
} from './account.routes';
import {
    logInRoutes,
    logOutRoute,
    signUpRoute,
    verifyEmailRoute
} from './auth.routes';
import {
    invitationRoutes
} from './invitation.routes';
import {
    feedMainRoute
} from './feed.routes';
import {
    boardRoutes
} from './board.routes';
import {
    companyRoutes
} from './company.routes';
import {
    ideaRoutes
} from './idea.routes';
import {
    userRoutes
} from './user.routes';
import {
    upgradeRoutes
} from "./upgrade.routes";
import {
    searchResult
} from "./result.routers";

import populateSlug from '../guards/populate-slug.guard';


export default [
    notFoundRoute,
    unauthorizedRoute,

    invitationRoutes,

    signUpRoute,
    logInRoutes,
    logOutRoute,
    verifyEmailRoute,

    {
        path: '/',
        name: 'root',
        meta: {
            requiresUser: true
        },
        beforeEnter: populateSlug
    },
    {
        path: '/:slug',
        component: () => import('@/views/main/Main'),
        props: true,
        meta: {
            requiresUser: true,
            requiresCompany: true
        },
        children: [
            unauthorizedCompanyRoute,

            accountRoutes,

            searchResult,

            boardRoutes,

            companyRoutes,

            feedMainRoute,

            ideaRoutes,

            userRoutes,

            upgradeRoutes
        ]
    }
];