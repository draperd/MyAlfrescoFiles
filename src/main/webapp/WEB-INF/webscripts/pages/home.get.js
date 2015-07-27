<import resource="classpath:/alfresco/site-webscripts/org/alfresco/aikau/webscript/libs/doclib/doclib.lib.js">

var services = [
   {
      name: "alfresco/services/LoggingService",
      config: {
         loggingPreferences: {
            enabled: true,
            all: true
         }
      }
   },
   "alfresco/services/LogoutService"
];

addDocumentLibraryServices(services); 

var docLib = getDocLib({
   siteId: null, 
   containerId: null, 
   rootNode: "alfresco://user/home", 
   rootLabel: "My Files", 
   rawData: true, 
   useHash: false
});

model.jsonModel = {
   services: services,
   widgets: [
      {
         id: "MAIN_VERTICAL_LAYOUT",
         name: "alfresco/layout/VerticalWidgets",
         config: {
            widgets: [
               {
                  id: "HEADER_BAR",
                  name: "alfresco/header/Header",
                  config: {
                     widgets: [
                        {
                           id: "APP_MENU_BAR",
                           name: "alfresco/header/AlfMenuBar",
                           align: "left",
                           config: {
                              widgets: [
                                 {
                                    id: "HOME",
                                    name: "alfresco/menus/AlfMenuBarItem",
                                    config: {
                                       label: "Home",
                                       targetUrl: "ap/ws/home"
                                    }
                                 },
                                 {
                                    name: "alfresco/header/AlfMenuBarPopup",
                                    config: {
                                       label: "Debug Menu",
                                       widgets: [
                                          {
                                             name: "alfresco/menus/AlfMenuGroup",
                                             config: {
                                                label: "Quick Settings",
                                                widgets: [
                                                   {
                                                      name: "alfresco/menus/AlfCheckableMenuItem",
                                                      config: {
                                                         label: "Debug Logging",
                                                         value: "enabled",
                                                         publishTopic: "ALF_LOGGING_STATUS_CHANGE",
                                                         checked: true
                                                      }
                                                   },
                                                   {
                                                      name: "alfresco/menus/AlfCheckableMenuItem",
                                                      config: {
                                                         label: "Show All Logs",
                                                         value: "all",
                                                         publishTopic: "ALF_LOGGING_STATUS_CHANGE",
                                                         checked: true
                                                      }
                                                   },
                                                   {
                                                      name: "alfresco/menus/AlfCheckableMenuItem",
                                                      config: {
                                                         label: "Show Warning Messages",
                                                         value: "warn",
                                                         publishTopic: "ALF_LOGGING_STATUS_CHANGE",
                                                         checked: false
                                                      }
                                                   },
                                                   {
                                                      name: "alfresco/menus/AlfCheckableMenuItem",
                                                      config: {
                                                         label: "Show Error Messages",
                                                         value: "error",
                                                         publishTopic: "ALF_LOGGING_STATUS_CHANGE",
                                                         checked: false
                                                      }
                                                   }
                                                ]
                                             }
                                          },
                                          {
                                             name: "alfresco/menus/AlfMenuGroup",
                                             config: {
                                                label: "Logging Configuration",
                                                widgets: [
                                                   {
                                                      name: "alfresco/menus/AlfMenuItem",
                                                      config: {
                                                         label: "Update Logging Preferences",
                                                         publishTopic: "ALF_UPDATE_LOGGING_PREFERENCES"
                                                      }
                                                   },
                                                   {
                                                      name: "alfresco/menus/AlfMenuItem",
                                                      config: {
                                                         label: "Show Pub/Sub Log",
                                                         publishTopic: "ALF_SHOW_PUBSUB_LOG"
                                                      }
                                                   },
                                                   {
                                                      name: "alfresco/menus/AlfMenuItem",
                                                      config: {
                                                         label: "Show Data Model",
                                                         publishTopic: "ALF_SHOW_DATA_MODEL"
                                                      }
                                                   },
                                                   {
                                                      name: "alfresco/menus/AlfMenuItem",
                                                      config: {
                                                         label: "Toggle Developer View",
                                                         publishTopic: "ALF_TOGGLE_DEVELOPER_MODE"
                                                      }
                                                   }
                                                ]
                                             }
                                          }
                                       ]
                                    }
                                 }
                              ]
                           }
                        },
                        {
                           id: "USER_MENU_BAR",
                           name: "alfresco/header/AlfMenuBar",
                           align: "right",
                           config: {
                              widgets: [
                                 {
                                    id: "USER_MENU",
                                    name: "alfresco/header/AlfMenuBarPopup",
                                    config: {
                                       label: "User Menu",
                                       widgets: [
                                          {
                                             id: "HEADER_USER_MENU",
                                             name: "alfresco/menus/AlfMenuGroup",
                                             config: {
                                                widgets: [
                                                   {
                                                      id: "LOGOUT",
                                                      name: "alfresco/header/AlfMenuItem",
                                                      config:
                                                      {
                                                         label: "Logout",
                                                         iconClass: "alf-user-logout-icon",
                                                         publishTopic: "ALF_DOLOGOUT"
                                                      }
                                                   }
                                                ]
                                             }
                                          }
                                       ]
                                    }
                                 }
                              ]
                           }
                        }
                     ]
                  }
               },
               {
                  id: "HEADER_TITLE_BAR",
                  name: "alfresco/layout/LeftAndRight",
                  className: "share-header-title",
                  config:
                  {
                     semanticWrapper: "header",
                     widgets:
                     [
                        {
                           id: "HEADER_LOGO",
                           name: "alfresco/logo/Logo",
                           align: "left",
                           config:
                           {
                              logoClasses: "alfresco-logo-only"
                           }
                        },
                        {
                           id: "HEADER_TITLE",
                           name: "alfresco/header/Title",
                           align: "left",
                           config: {
                              label: "My Alfresco Files",
                              setBrowserTitle: "Home"
                           }
                        }
                     ]
                  }
               }
            ]
         }
      },
      docLib
   ]
};

// var breadcrumbTrail =  widgetUtils.findObject(model.jsonModel, "id", "DOCLIB_BREADCRUMB_TRAIL");
// if (breadcrumbTrail && breadcrumbTrail.config)
// {
//    breadcrumbTrail.config.useHash = false;
// }
// var docList =  widgetUtils.findObject(model.jsonModel, "id", "DOCLIB_DOCUMENT_LIST");
// if (docList && docList.config)
// {
//    docList.config.useHash = false;
// }
