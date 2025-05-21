import ClientApi from '.'
import { DELETE, GET, POST, PUT } from './utils/operations'

const client = new ClientApi(
  '/api', // reverse proxy in next.config.mjs
  {
    //****** Auth
    checkSession: GET('/auth/session', 'Sessione non trovata.'),
    //logIn: Use Supertokens SDK instead
    logOut: DELETE('/auth/logout', 'Impossibile revocare la sessione.'),
    changePassword: PUT(
      '/auth/change-password',
      'Cambio password non riuscito. Verificare credenziali.'
    ),

    //GetUUID by Email
    resetPassword: POST(
      '/auth/reset-password',
      'Impossibile resettare la password, link scaduto. Riprovare'
    ),
    resetPasswordUsingToken: PUT(
      '/auth/reset-password',
      'Impossibile resettare la password, link scaduto. Riprovare'
    ),

    //****** Admin
    getUsers: GET(
      '/auth/admin/users',
      'Impossibile recuperare la lista degli utenti. Riprovare.'
    ),
    createUser: POST('/auth/admin/users', 'Utente già esistente. Riprovare.'),
    getUser: GET(
      '/auth/admin/users/{uid}',
      "Impossibile recuperare le informazioni dell'utente. Riprovare."
    ),
    updateUser: PUT(
      '/auth/admin/users/{uid}',
      "Impossibile aggiornare l'utente. Riprovare."
    ),
    deleteUser: DELETE(
      '/auth/admin/users/{uid}',
      "Impossibile cancellare l'utente. Riprovare."
    ),
    getUserRoles: GET(
      '/auth/admin/users/{uid}/roles',
      "Impossibile recuperare i ruoli dell'utente. Riprovare."
    ),
    updateOutOffice: PUT(
      '/auth/admin/users/outOffice',
      "Impossibile aggiornare l'utente. Riprovare."
    ),

    getRoles: GET(
      '/auth/admin/roles',
      'Impossibile recuperare la lista dei ruoli. Riprovare.'
    ),
    createRoleWithPermissions: POST(
      '/auth/admin/roles/add-role',
      'Ruolo già esistente. Riprovare.'
    ),
    deleteRole: DELETE(
      '/auth/admin/roles/{roleId}',
      'Impossibile cancellare il ruolo. Riprovare.'
    ),
    addRoleToUser: POST(
      '/auth/admin/roles/role-user',
      "Impossibile aggiungere il ruolo all'utente. Riprovare."
    ),
    removeRoleToUser: DELETE(
      '/auth/admin/roles/role-user',
      "Impossibile rimuovere il ruolo all'utente. Riprovare."
    ),
    getUsersFromRole: GET(
      '/auth/admin/roles/role-user',
      'Impossibile recuperare gli utente associati al ruolo. Riprovare.'
    ),
    getUsersExceptRole: GET(
      '/auth/admin/roles/add-users',
      'Impossibile recuperare gli utenti. Riprovare.'
    ),

    getCdcNotUser: GET(
      '/auth/admin/cdc/add',
      'Impossibile recuperare i centri di costo. Riprovare.'
    ),
    assignCdcUser: POST(
      '/auth/admin/cdc',
      "Impossibile assegnare il centro di costo all'utente. Riprovare."
    ),
    getCdcUser: GET(
      '/auth/admin/cdc',
      'Impossibile recuperare i Cdc assegnati. Riprovare.'
    ),
    removeCdcUser: DELETE(
      '/auth/admin/cdc',
      'Impossibile eliminare il Cdc da questo utente. Riprovare.'
    ),
    getUserToAddRda: GET("/auth/admin/roles-rda/userAdd","Impossibile recuperare gli utenti"),
    getUserRda: GET("/auth/admin/roles-rda","Impossibile recuperare gli utenti"),
    addSupervisorToL1: POST(
      '/auth/admin/roles-rda',
      "Impossibile aggiungere il ruolo all'utente. Riprovare."
    ),
    getTypeParent: GET("/auth/admin/roles-rda/get"),
    updDefaultMail: POST("/auth/admin/roles-rda/change-mail"),
    removeUserToRda: POST("/auth/admin/roles-rda/userAdd","Impossibile rimuovere utente"),


    //****** Dipartimenti
    createDepartment: POST(
      '/auth/admin/department',
      'Impossibile creare il dipartimento. Riprovare.'
    ),
    getDepartments: GET(
      '/auth/admin/department',
      'Impossibile recupare i dipartimenti. Riprovare.'
    ),
    deleteDepartment: DELETE(
      '/auth/admin/department',
      'Impossibile eliminare il dipartimento. Riprovare.'
    ),

    //****** Cdc Dipartimento
    getCdc: GET(
      '/auth/admin/department/cdcAdd',
      'Impossibile recuperare i centri di costo. Riprovare.'
    ),
    getCdcDepartment: GET(
      '/auth/admin/department/cdc',
      'Impossibile recuperare i centri di costo. Riprovare.'
    ),
    assignCdcDepartment: POST(
      '/auth/admin/department/cdc',
      'Impossibile assegna centro di costo al dipartimento. Riprovare.'
    ),
    removeCdcDepartment: DELETE(
      '/auth/admin/department/cdc',
      'Impossibile rimuover il centro di costo dal dipartimento. Riprovare.'
    ),

    //****** User x Department

    assignDepartmentUser: POST(
      '/auth/admin/department/role',
      'Impossibile assegnare reparto. Riprovare'
    ),
    getDepartmentUser: GET(
      '/auth/admin/department/role',
      'Impossibile recupare i reparti assegnati. Riprovare.'
    ),
    removeDepartmentUser: DELETE(
      '/auth/admin/department/role',
      "Impossibile rimuovere l'assegnazione. Riprovare."
    ),
    getDepartmentToAssign: GET('/auth/admin/department/departmentAdd'),
    getUserToAssign: GET('/auth/admin/department/userAdd'),
    assignUserToDepartment: POST('/auth/admin/department/userAdd'),
    getAlternateToAssign: GET('/auth/admin/department/alternateAdd'),

    getPermissionsForRole: GET(
      '/auth/admin/permissions/{roleId}',
      'Impossibile recuperare i permessi del ruolo. Riprovare.'
    ),
    removePermissionsForRole: DELETE(
      '/auth/admin/permissions/{roleId}',
      'Impossibile rimuovere i permessi dal ruolo. Riprovare.'
    ),

    //****** Prodotti
    getManyProducts: POST(
      '/be/article/filtered_article',
      'Impossibile recuperare la lista dei prodotti. Riprovare.'
    ),
    upload: POST(
      '/be/article/upload_article',
      'Impossibile effetturare il caricamento del file. Riprovare.'
    ),
    getPoTxt: POST(
      '/be/article/filtered_po_txt',
      'Impossibile recuperare i po_txt. Riprovare.'
    ),

    //****** Ordini
    createOrder: POST(
      "/be/order/create_order",
      "Impossibile creare l'ordine. Riprovare."
    ),
    getOrder: POST(
      "/be/order/filtered_order",
      "Impossibile recuperare gli ordini. Riprovare"
    ),
    changeStatus: POST("/be/order/change_status"),
    approveItem: POST(
      "/be/order/approveorderitem",
      "Impossibile cambiare lo stato dell'ordine. Riprovare."
    ),
    getOrderApprove: POST(
      "/be/order/approved_order",
      "Impossibile recuperare gli ordini. Riprovare"
    ),
    getOrdersToPickUp: POST(
      "/be/order/filtered_order_term",
      "Impossibile recuperare gli ordini. Riprovare"
    ),
    deleteOrder: DELETE(
      "/be/order/delete_order",
      "Impossibile eliminare ordine. Riprovare"
    ),
    exportStory: POST(
      "/be/order/esportazione_order",
      "Impossibile esportare lo storico degli ordini."
    ),

    //****** Centro di costo
    getCentersCost: POST(
      '/be/centricosto/filtered_centri_costo',
      'Impossibile recuperare gli ordini in pending. Riprovare.'
    ),
    getCdcs: GET('/auth/admin/cdc/get'),
    updateCdc: PUT('/auth/admin/cdc/update'),
    createCdc: POST('/auth/admin/cdc/new'),
    removeCdc: DELETE('/auth/admin/cdc/delete'),
    activeCdc: PUT('/auth/admin/cdc/active'),
    getCentersCostRda: POST(
      '/be/centricosto/centri_costo_rda',
      'Impossibile recuperare gli ordini in pending. Riprovare.'
    ),
    newCdcRda: POST('/be/centricosto/insert_centri_costo_rda', "Impossibile creare nuovo cdc"),
    updateCdcRda: PUT('/be/centricosto/upd_centri_costo_rda', "Impossibile creare nuovo cdc"),
    deleteCdcRda: DELETE('/be/centricosto/delete_centri_costo_rda', "Impossibile creare nuovo cdc"),


    //****** Photo
    uploadPhoto: POST('/be/photo/insert_photo'),

    //****** Manual
    uploadManual: POST('/be/manual/upload_manual'), //modificare

    //****** Report

    sendReport: POST('/be/utils/send_report'),

    //****** Pick Up
    pickUp: POST(
      '/be/picking/ins_picking',
      'Impossibile prelevare il prodotto. Riprovare.'
    ),
    closePickUp: POST(
      '/be/picking/close_picking',
      'Impossibile prelevare il prodotto. Riprovare.'
    ),

    //****** Fornitore
    getFornitore: POST(
      '/be/fornitori/get_fornitori',
      'Impossibile trovare i fornitori. Riprovare.'
    ),
    insertFornitore: POST(
      '/be/fornitori/insert_fornitore',
      'Impossibile inserire il fornitore. Riprovare.'
    ),
    updateFornitore: PUT(
      '/be/fornitori/upd_fornitori',
      'Impossibile aggiornare il fornitore. Riprovare.'
    ),
    deleteFornitore: DELETE(
      '/be/fornitori/delete_fornitore',
      'Impossibile eliminare il fornitore. Riprovare.'
    ),

    //****** Categoria
    getCategorie: POST(
      '/be/categoria/get_categorie',
      'Impossibile trovare le categorie. Riprovare.'
    ),
    insertCategoria: POST(
      '/be/categoria/insert_categoria',
      'Impossibile inserire la categoria. Riprovare.'
    ),
    updateCategoria: PUT(
      '/be/categoria/upd_categoria',
      'Impossibile aggiornare la categoria. Riprovare.'
    ),
    deleteCategoria: DELETE(
      '/be/categoria/delete_categoria',
      'Impossibile eliminare la categoria. Riprovare.'
    ),

    //****** Parti macchina
    getPartiMacchina: POST(
      '/be/parti_macchina/get_parti_macchina',
      'Impossibile trovare le parti macchina. Riprovare.'
    ),
    insertParteMacchina: POST(
      '/be/parti_macchina/insert_parte_macchina',
      'Impossibile inserire la parte macchina. Riprovare.'
    ),
    updateParteMacchina: PUT(
      '/be/parti_macchina/upd_parte_macchina',
      'Impossibile aggiornare la parte macchina. Riprovare.'
    ),
    deleteParteMacchina: DELETE(
      '/be/parti_macchina/delete_parte_macchina',
      'Impossibile eliminare la parte macchina. Riprovare.'
    ),
    insertNotaParteMacchina: POST(
      '/be/parti_macchina/insert_parte_macchina_link',
      'Impossibile inserire la nota alla parte macchina. Riprovare.'
    ),
    getNoteParteMacchina: GET(
      '/be/parti_macchina/get_parti_macchina_note/{id_parte}',
      'Impossibile recuperare le note della parte macchina. Riprovare.'
    ),
    getLinkParteMacchina: POST(
      '/be/parti_macchina/get_parti_macchina_link/',
      'Impossibile recuperare le note della parte macchina. Riprovare.'
    ),

    /* *** Richieste */
    getRequest: POST(
      '/be/richieste/get_richieste',
      'Impossibile recuperare le richieste. Riprovare.'
    ),
    getRequestPrc: POST(
      '/be/richieste/get_richieste_accettate',
      'Impossibile recuperare le richieste. Riprovare.'
    ),
    getSingleRequest: GET(
      '/be/richieste/get_richiesta',
      'Impossibile recuperare la richiesta. Riprovare.'
    ),
    newRequest: POST(
      '/be/richieste/insert_richiesta',
      'Impossibile inserire la richiesta. Riprovare.'
    ),
    updateRequest: PUT(
      '/be/richieste/upd_richiesta',
      'Impossibile aggiornare la richiesta. Riprovare.'
    ),
    /* deleteRequest: DELETE(
      '/be/richieste/delete_richiesta',
      'Impossibile eliminare la richiesta. Riprovare.'
    ), */
    uploaAllegatiRichiesta: POST(
      '/be/richieste/insert_allegato_richiesta',
      'Impossibile inserire la richiesta. Riprovare.'
    ),
    cambiaStato: PUT(
      '/be/richieste/cambia_stato_richiesta',
      'Impossibile cambiare stato della richiesta. Riprovare.'
    ),

    sendEmail: POST(
      '/be/richieste/reminder_rda',
      'Impossibile inviare email. Riprovare.'
    ),
    exportRichiesteAccettate: POST(
      '/be/richieste/esportazione_richieste_accettate',
      'Impossibile esportare richieste. Riprovare.'
    ),

    /* GL-ACCOUNT */
    getGlAccount: POST(
      '/be/gl_account/get_gl_account',
      'Impossibile recuperare gl-account. Riprovare.'
    ),
    insertGlAccount: POST(
      '/be/gl_account/insert_gl_account',
      'Impossibile inserire gl-account. Riprovare.'
    ),
    updateGlAccount: PUT(
      '/be/gl_account/upd_gl_account',
      'Impossibile aggiornare gl-account. Riprovare.'
    ),
    deleteGlAccount: DELETE(
      '/be/gl_account/delete_gl_account',
      'Impossibile eliminare gl-account. Riprovare.'
    ),
    legend: GET("/be/gl_account/get_sotto_gruppi"),
    

    /* Trhead-Richiesta */
    getThreads: POST("/be/thread_richieste/get_thread_richieste"),
    insertThread: POST("/be/thread_richieste/insert_thread_richieste"),
    insertAllegatoThread: POST("/be/thread_richieste/insert_allegato_thread"),

    /* Esportazioni */

    exportRichieste: POST("/be/richieste/esportazione_richiesta"),

    /* Budget */
    insertMonth: POST("/be/graphics/insert_history"),
    updBudget: PUT("/be/graphics/upd_budget"),
    getGraphic: POST("/be/graphics/get_graphic"),
    getHistory: POST("/be/graphics/get_history"),
    updMonth: PUT("/be/graphics/upd_history"),
    getBudget: GET("/be/graphics/get_budget"),
    deleteMonth: DELETE("/be/graphics/delete_history"),
    getLastHistory: GET("/be/graphics/last_history"),
    

  }
)

export default client
