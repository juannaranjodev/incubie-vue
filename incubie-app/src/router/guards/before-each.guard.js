import multiGuard from 'vue-router-multiguard'
import ensureUserGuard from './ensure-user.guard'
import ensureCompanyAdmin from './ensure-company-admin.guard'
import ensureCompany from './ensure-company.guard'

export default async function beforeEachGuard (to, from, next) {
  const requiresUser = to.matched.some(record => record.meta.requiresUser);
  const requiresCompanyAdmin = to.matched.some(record => record.meta.requiresCompanyAdmin);
  const requiresCompany = to.matched.some(record => record.meta.requiresCompany);
  const guards = [];

  if (requiresUser) {
    guards.push(ensureUserGuard);
  }

  if (requiresCompany) {
    guards.push(ensureCompany);
  }

  if (requiresCompanyAdmin) {
    guards.push(ensureCompanyAdmin);
  }

  return multiGuard(guards)(to, from, next);
}
