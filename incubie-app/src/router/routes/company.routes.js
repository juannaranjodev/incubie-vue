export const companyRoutes = {
  path: 'company',
  components: {
    default: () => import('@/views/company/Company'),
    toolbar: () => import('@/views/company/CompanyToolbar')
  },
  meta: {
    requiresCompanyAdmin: true
  },
  children: [
    {
      path: 'members',
      name: 'company/members',
      component: () => import('@/views/company/CompanyMembers')
    },
    {
      path: 'billing',
      name: 'company/billing',
      component: () => import('@/views/company/CompanyBilling')
    },
    {
      path: 'create',
      name: 'company/create',
      props: { create: true },
      component: () => import('@/views/company/CompanyHome')
    },
    {
      path: '',
      name: 'company/home',
      component: () => import('@/views/company/CompanyHome')
    }
  ]
}
