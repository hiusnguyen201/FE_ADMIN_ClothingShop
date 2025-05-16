export enum PERMISSIONS {
  //   User
  READ_USERS = "read:users",
  READ_DETAILS_USERS = "read:details:user",
  CREATE_USER = "create:user",
  EDIT_USER = "edit:user",
  REMOVE_USER = "remove:user",
  RESET_PASSWORD_USER = "reset-password:user",

  //   Role
  READ_ROLES = "read:roles",
  READ_DETAILS_ROLE = "read:details:role",
  CREATE_ROLE = "create:role",
  EDIT_ROLE = "edit:role",
  REMOVE_ROLE = "remove:role",
  READ_ASSIGNED_ROLE_PERMISSIONS = "read:assigned_role_permissions",
  READ_UNASSIGNED_ROLE_PERMISSIONS = "read:unassigned_role_permissions",
  ADD_ROLE_PERMISSIONS = "add:role_permissions",
  REMOVE_ROLE_PERMISSIONS = "remove:role_permissions",

  //   Permission
  READ_PERMISSIONS = "read:permissions",

  //   Category
  READ_CATEGORIES = "read:categories",
  READ_DETAILS_CATEGORY = "read:details:category",
  CREATE_CATEGORY = "create:category",
  EDIT_CATEGORY = "edit:category",
  REMOVE_CATEGORY = "remove:category",
  GET_SUB_CATEGORIES = "get:sub_categories",

  //   Customer
  READ_CUSTOMERS = "read:customers",
  READ_DETAILS_CUSTOMER = "read:details:customer",
  CREATE_CUSTOMER = "create:customer",
  EDIT_CUSTOMER = "edit:customer",
  REMOVE_CUSTOMER = "remove:customer",

  //   Product
  READ_PRODUCTS = "read:products",
  READ_DETAILS_PRODUCT = "read:details:product",
  CREATE_PRODUCT = "create:product",
  EDIT_PRODUCT_INFO = "edit:product_info",
  EDIT_PRODUCT_VARIANTS = "edit:product_variants",
  REMOVE_PRODUCT = "remove:product",

  //   Order
  READ_ORDERS = "read:orders",
  READ_DETAILS_ORDER = "read:details:order",
  CREATE_ORDER = "create:order",
  REMOVE_ORDER = "remove:order",
  CONFIRM_ORDER = "confirm:order",
  CANCEL_ORDER = "cancel:order",
  PROCESSING_ORDER = "processing:order",
  CREATE_SHIP_ORDER = "create-ship:order",

  // Export
  EXPORT_USERS_EXCEL = "export:users:excel",
  EXPORT_USERS_PDF = "export:users:pdf",

  EXPORT_CUSTOMERS_EXCEL = "export:customers:excel",
  EXPORT_CUSTOMERS_PDF = "export:customers:pdf",

  EXPORT_PERMISSIONS_EXCEL = "export:permissions:excel",
  EXPORT_PERMISSIONS_PDF = "export:permissions:pdf",

  EXPORT_PRODUCTS_EXCEL = "export:products:excel",
  EXPORT_PRODUCTS_PDF = "export:products:pdf",

  EXPORT_CATEGORIES_EXCEL = "export:categories:excel",
  EXPORT_CATEGORIES_PDF = "export:categories:pdf",

  EXPORT_ROLES_EXCEL = "export:roles:excel",
  EXPORT_ROLES_PDF = "export:roles:pdf",

  EXPORT_ORDERS_EXCEL = "export:orders:excel",
  EXPORT_ORDERS_PDF = "export:orders:pdf",
}
