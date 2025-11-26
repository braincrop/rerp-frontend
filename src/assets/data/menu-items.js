export const MENU_ITEMS = [{
  key: 'menu',
  label: 'MENU',
  isTitle: true
}, {
  key: 'dashboards',
  label: 'dashboard',
  icon: 'solar:widget-2-outline',
  url: '/dashboards',
  badge: {
    text: 'New',
    variant: 'primary'
  }
},
// ====================Authentication===============

{
  key: 'auth',
  label: 'Authentication',
  icon: 'solar:user-circle-outline',
  children: [{
    key: 'sign-in',
    label: 'Sign In',
    url: '/auth/sign-in',
    parentKey: 'auth'
  }, {
    key: 'sign-up',
    label: 'Sign Up',
    url: '/auth/sign-up',
    parentKey: 'auth'
  }, {
    key: 'reset-password',
    label: 'Reset Password',
    url: '/auth/reset-password',
    parentKey: 'auth'
  }, {
    key: 'lock-screen',
    label: 'Lock Screen',
    url: '/auth/lock-screen',
    parentKey: 'auth'
  }]
},
{
key:"category",
label:"Category",
icon:"solar:category-outline",
children:[{
  key:"add",
  label:"Add",
  url:"/category/add",
  parentKey:"category"
},
{
  key:"list",
  label:"List",
  url:"/category/list",
  parentKey:"category"
}]

},
// ====================error===============

{
  key: 'error-pages',
  label: 'Error Pages',
  icon: 'solar:danger-outline',
  children: [{
    key: '404-error',
    label: '404 Error',
    url: '/error-pages/pages-404',
    parentKey: 'error'
  }, {
    key: '404-error(alt)',
    label: '404 Error (alt)',
    url: '/pages-404-alt',
    parentKey: 'error'
  }]
},
// ====================base-ui===============
// {
//   key: 'ui-kit',
//   label: 'UI Kit...',
//   isTitle: true
// }, {
//   key: 'base-ui',
//   label: 'Base UI',
//   icon: 'solar:leaf-outline',
//   children: [{
//     key: 'accordion',
//     label: 'Accordion',
//     url: '/base-ui/accordion',
//     parentKey: 'base-ui'
//   }, {
//     key: 'alerts',
//     label: 'Alerts',
//     url: '/base-ui/alerts',
//     parentKey: 'base-ui'
//   }, {
//     key: 'avatar',
//     label: 'Avatar',
//     url: '/base-ui/avatar',
//     parentKey: 'base-ui'
//   }, {
//     key: 'badge',
//     label: 'Badge',
//     url: '/base-ui/badge',
//     parentKey: 'base-ui'
//   }, {
//     key: 'breadcrumb',
//     label: 'Breadcrumb',
//     url: '/base-ui/breadcrumb',
//     parentKey: 'base-ui'
//   }, {
//     key: 'buttons',
//     label: 'Buttons',
//     url: '/base-ui/buttons',
//     parentKey: 'base-ui'
//   }, {
//     key: 'cards',
//     label: 'Cards',
//     url: '/base-ui/cards',
//     parentKey: 'base-ui'
//   }, {
//     key: 'carousel',
//     label: 'Carousel',
//     url: '/base-ui/carousel',
//     parentKey: 'base-ui'
//   }, {
//     key: 'collapse',
//     label: 'Collapse',
//     url: '/base-ui/collapse',
//     parentKey: 'base-ui'
//   }, {
//     key: 'dropdown',
//     label: 'Dropdown',
//     url: '/base-ui/dropdown',
//     parentKey: 'base-ui'
//   }, {
//     key: 'list-group',
//     label: 'List Group',
//     url: '/base-ui/list-group',
//     parentKey: 'base-ui'
//   }, {
//     key: 'modals',
//     label: 'Modals',
//     url: '/base-ui/modals',
//     parentKey: 'base-ui'
//   }, {
//     key: 'tabs',
//     label: 'Tabs',
//     url: '/base-ui/tabs',
//     parentKey: 'base-ui'
//   }, {
//     key: 'offcanvas',
//     label: 'Offcanvas',
//     url: '/base-ui/offcanvas',
//     parentKey: 'base-ui'
//   }, {
//     key: 'pagination',
//     label: 'Pagination',
//     url: '/base-ui/pagination',
//     parentKey: 'base-ui'
//   }, {
//     key: 'placeholders',
//     label: 'Placeholders',
//     url: '/base-ui/placeholders',
//     parentKey: 'base-ui'
//   }, {
//     key: 'popovers',
//     label: 'Popovers',
//     url: '/base-ui/popovers',
//     parentKey: 'base-ui'
//   }, {
//     key: 'progress',
//     label: 'Progress',
//     url: '/base-ui/progress',
//     parentKey: 'base-ui'
//   }, {
//     key: 'spinners',
//     label: 'spinners',
//     url: '/base-ui/spinners',
//     parentKey: 'base-ui'
//   }, {
//     key: 'toasts',
//     label: 'Toasts',
//     url: '/base-ui/toasts',
//     parentKey: 'base-ui'
//   }, {
//     key: 'tooltips',
//     label: 'Tooltips',
//     url: '/base-ui/tooltips',
//     parentKey: 'base-ui'
//   }]
// },
// ====================apex===============
// {
//   key: 'apex',
//   label: 'Apex charts',
//   icon: 'solar:chart-square-outline',
//   url: '/apex-chart'
// },
// ====================forms===============
// {
//   key: 'forms',
//   label: 'Forms',
//   icon: 'solar:box-outline',
//   children: [{
//     key: 'basic',
//     label: 'Basic Element',
//     url: '/forms/basic',
//     parentKey: 'forms'
//   }, {
//     key: 'flat-picker',
//     label: 'Flatepicker',
//     url: '/forms/flat-picker',
//     parentKey: 'forms'
//   }, {
//     key: 'validation',
//     label: 'Validation',
//     url: '/forms/validation',
//     parentKey: 'forms'
//   }, {
//     key: 'file-uploads',
//     label: 'File Upload',
//     url: '/forms/file-uploads',
//     parentKey: 'forms'
//   }, {
//     key: 'editors',
//     label: 'Editors',
//     url: '/forms/editors',
//     parentKey: 'forms'
//   }]
// },
// ====================tables===============


];