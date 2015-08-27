<import resource="classpath:alfresco/site-webscripts/org/alfresco/aikau/webscript/libs/doclib/doclib.lib.js">

var pageServices = [
   {
      name: "alfresco/services/LoggingService",
      config: {
         loggingPreferences: {
            enabled: true,
            all: true
         }
      }
   },
   "alfresco/services/NavigationService",
   "alfresco/services/LogoutService",
   "alfresco/services/CrudService",
   "alfresco/services/PreferenceService",
   "alfresco/services/SiteService",
   {
      name: "alfresco/services/DocumentService",
      config: {
         rawData: true
      }
   }
];

var docLibServices = getDocumentLibraryServices();
var services = pageServices.concat(docLibServices);

var myFilesOptions = {
   siteId: null, 
   containerId: null, 
   rootNode: "alfresco://user/home", 
   rootLabel: "My Files", 
   rawData: true, 
   useHash: false,
   waitForPageWidgets: false
};

var sitesOptions = {
   siteId: "{shortName}", 
   containerId: "documentLibrary", 
   rootNode: null, 
   rootLabel: "{title}", 
   rawData: true, 
   useHash: false,
   waitForPageWidgets: false
};

model.jsonModel = {
   services: services,
   widgets: [
      {
         name: "alfresco/layout/StripedContent",
         config: {
            contentWidth: "950px",
            widgets: [
               {
                  stripeClass: "header",
                  id: "HEADER_BAR",
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
                              logoClasses: "alfresco-logo-large"
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
               },
               {
                  stripeClass: "sub-header",
                  stripeStyle: "border-bottom: 1px solid #aaa;",
                  id: "HEADER_TITLE_BAR",
                  name: "alfresco/layout/LeftAndRight",
                  config: {
                     widgets: [
                        {
                           id: "APP_MENU_BAR",
                           name: "alfresco/menus/AlfMenuBar",
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
                                 }
                              ]
                           }
                        },
                        {
                           id: "USER_MENU_BAR",
                           name: "alfresco/menus/AlfMenuBar",
                           align: "right",
                           config: {
                              widgets: [
                                 {
                                    id: "USER_MENU",
                                    name: "alfresco/menus/AlfMenuBarPopup",
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
                                                      name: "alfresco/menus/AlfMenuItem",
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
                  name: "alfresco/layout/AlfTabContainer",
                  config: {
                     // height: "500px",
                     tabSelectionTopic: "ALF_SELECT_TAB",
                     tabDisablementTopic: "ALF_DISABLE_TAB",
                     tabAdditionTopic: "ALF_ADD_TAB",
                     tabDeletionTopic: "ALF_DELETE_TAB",
                     widgets: [
                        // {
                        //    name: "alfresco/layout/VerticalWidgets",
                        //    title: "My Dashboard",
                        //    config: {
                        //    }
                        // },
                        {
                           name: "alfresco/layout/VerticalWidgets",
                           title: "My Files",
                           config: {
                              // pubSubScope: "MY_DOCUMENTS_",
                              widgets: [
                                 getDocLibToolbar(myFilesOptions),
                                 {
                                    id: "DOCLIB_BREADCRUMB_TRAIL",
                                    name: "alfresco/documentlibrary/AlfBreadcrumbTrail",
                                    config: {
                                       hide: myFilesOptions.docLibPrefrences.hideBreadcrumbTrail,
                                       rootLabel: myFilesOptions.rootLabel || "root.label",
                                       lastBreadcrumbIsCurrentNode: true,
                                       useHash: (myFilesOptions.useHash !== false),
                                       pathChangeTopic: "ALF_DOCUMENTLIST_PATH_CHANGED",
                                       lastBreadcrumbPublishTopic: "ALF_NAVIGATE_TO_PAGE",
                                       lastBreadcrumbPublishPayload: {
                                          url: "folder-details?nodeRef={currentNode.parent.nodeRef}",
                                          type: "PAGE_RELATIVE",
                                          target: "CURRENT"
                                       },
                                       lastBreadcrumbPublishPayloadType: "PROCESS",
                                       lastBreadcrumbPublishPayloadModifiers: ["processInstanceTokens"]
                                    }
                                 },
                                 getDocLibList(myFilesOptions)
                              ]
                           }
                        },
                        {
                           name: "alfresco/layout/VerticalWidgets",
                           title: "My Sites",
                           config: {
                              pubSubScope: "MY_SITES_",
                              widgets: [
                                 {
                                    name: "alfresco/lists/AlfList",
                                    config: {
                                       waitForPageWidgets: false,
                                       loadDataPublishTopic: "ALF_CRUD_GET_ALL",
                                       loadDataPublishPayload: {
                                         url: "api/people/" + user.name + "/sites"
                                       },
                                       itemsProperty: "",
                                       widgets: [
                                          {
                                             name: "alfresco/lists/views/AlfListView",
                                             config: {
                                                widgetsForHeader: [
                                                   {
                                                      name: "alfresco/lists/views/layouts/HeaderCell",
                                                      config: {
                                                         label: "Title"
                                                      }
                                                   },
                                                   {
                                                      name: "alfresco/lists/views/layouts/HeaderCell",
                                                      config: {
                                                         label: "Description"
                                                      }
                                                   },
                                                   {
                                                      name: "alfresco/lists/views/layouts/HeaderCell",
                                                      config: {
                                                         label: "Visibility"
                                                      }
                                                   },
                                                   {
                                                      name: "alfresco/lists/views/layouts/HeaderCell",
                                                      config: {
                                                         label: "Actions"
                                                      }
                                                   }
                                                ],
                                                widgets: [
                                                   {
                                                      name: "alfresco/lists/views/layouts/Row",
                                                      config: {
                                                         widgets: [
                                                            {
                                                               name: "alfresco/lists/views/layouts/Cell",
                                                               config: {
                                                                  additionalCssClasses: "mediumpad",
                                                                  widgets: [
                                                                     {
                                                                        name: "alfresco/renderers/PropertyLink",
                                                                        config: {
                                                                           propertyToRender: "title",
                                                                           useCurrentItemAsPayload: false,
                                                                           publishTopic: "ALF_ADD_TAB",
                                                                           publishGlobal: true,
                                                                           publishPayloadType: "PROCESS",
                                                                           publishPayloadModifiers: ["processCurrentItemTokens"],
                                                                           publishPayload: {
                                                                              widgets: [
                                                                                 {
                                                                                    name: "alfresco/layout/VerticalWidgets",
                                                                                    title: "{title}",
                                                                                    closable: true,
                                                                                    selected: true,
                                                                                    config: {
                                                                                       pubSubScope: "SITE_SCOPED_{shortName}",
                                                                                       widgets: [
                                                                                          getDocLibToolbar(sitesOptions),
                                                                                          {
                                                                                             id: "DOCLIB_BREADCRUMB_TRAIL",
                                                                                             name: "alfresco/documentlibrary/AlfBreadcrumbTrail",
                                                                                             config: {
                                                                                                hide: sitesOptions.docLibPrefrences.hideBreadcrumbTrail,
                                                                                                rootLabel: sitesOptions.rootLabel || "root.label",
                                                                                                lastBreadcrumbIsCurrentNode: true,
                                                                                                useHash: (sitesOptions.useHash !== false),
                                                                                                pathChangeTopic: "ALF_DOCUMENTLIST_PATH_CHANGED",
                                                                                                lastBreadcrumbPublishTopic: "ALF_NAVIGATE_TO_PAGE",
                                                                                                lastBreadcrumbPublishPayload: {
                                                                                                   url: "folder-details?nodeRef={currentNode.parent.nodeRef}",
                                                                                                   type: "PAGE_RELATIVE",
                                                                                                   target: "CURRENT"
                                                                                                },
                                                                                                lastBreadcrumbPublishPayloadType: "PROCESS",
                                                                                                lastBreadcrumbPublishPayloadModifiers: ["processInstanceTokens"]
                                                                                             }
                                                                                          },
                                                                                          getDocLibList(sitesOptions)
                                                                                       ]
                                                                                    }
                                                                                 }
                                                                              ]
                                                                           }
                                                                        }
                                                                     }
                                                                  ]
                                                               }
                                                            },
                                                            {
                                                               name: "alfresco/lists/views/layouts/Cell",
                                                               config: {
                                                                  additionalCssClasses: "mediumpad",
                                                                  widgets: [
                                                                     {
                                                                        name: "alfresco/renderers/Property",
                                                                        config: {
                                                                           propertyToRender: "description"
                                                                        }
                                                                     }
                                                                  ]
                                                               }
                                                            },
                                                            {
                                                               name: "alfresco/lists/views/layouts/Cell",
                                                               config: {
                                                                  additionalCssClasses: "mediumpad",
                                                                  widgets: [
                                                                     {
                                                                        name: "alfresco/renderers/Property",
                                                                        config: {
                                                                           propertyToRender: "visibility"
                                                                        }
                                                                     }
                                                                  ]
                                                               }
                                                            },
                                                            {
                                                               name: "alfresco/lists/views/layouts/Cell",
                                                               config: {
                                                                  additionalCssClasses: "mediumpad",
                                                                  widgets: [
                                                                     {
                                                                        name: "alfresco/renderers/PublishAction",
                                                                        config: {
                                                                           iconClass: "delete-16",
                                                                           publishTopic: "ALF_DELETE_SITE",
                                                                           publishPayloadType: "PROCESS",
                                                                           publishPayloadModifiers: ["processCurrentItemTokens"],
                                                                           publishPayload: {
                                                                              document: {
                                                                                 shortName: "{shortName}"
                                                                              }
                                                                           },
                                                                           publishGlobal: true,
                                                                           renderFilter: [
                                                                              {
                                                                                 property: "siteManagers",
                                                                                 contains: [user.name]
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
                                          }
                                       ]
                                    }
                                 }
                              ]
                           }
                        }
                        // ,
                        // {
                        //    name: "alfresco/layout/VerticalWidgets",
                        //    title: "My Tasks",
                        //    config: {
                        //       pubSubScope: "MY_TASKS_",
                        //       widgets: [
                        //          {
                        //             name: "alfresco/lists/AlfList",
                        //             config: {
                        //                waitForPageWidgets: false,
                        //                loadDataPublishTopic: "ALF_CRUD_GET_ALL",
                        //                loadDataPublishPayload: {
                        //                  url: "slingshot/dashlets/my-tasks"
                        //                },
                        //                itemsProperty: "tasks",
                        //                widgets: [
                        //                   {
                        //                      name: "alfresco/lists/views/AlfListView",
                        //                      config: {
                        //                         widgetsForHeader: [
                        //                            {
                        //                               name: "alfresco/lists/views/layouts/HeaderCell",
                        //                               config: {
                        //                                  label: "Description"
                        //                               }
                        //                            },
                        //                            {
                        //                               name: "alfresco/lists/views/layouts/HeaderCell",
                        //                               config: {
                        //                                  label: "Status"
                        //                               }
                        //                            },
                        //                            {
                        //                               name: "alfresco/lists/views/layouts/HeaderCell",
                        //                               config: {
                        //                                  label: "Due Date"
                        //                               }
                        //                            }
                        //                         ],
                        //                         widgets: [
                        //                            {
                        //                               name: "alfresco/lists/views/layouts/Row",
                        //                               config: {
                        //                                  widgets: [
                        //                                     {
                        //                                        name: "alfresco/lists/views/layouts/Cell",
                        //                                        config: {
                        //                                           additionalCssClasses: "mediumpad",
                        //                                           widgets: [
                        //                                              {
                        //                                                 name: "alfresco/renderers/Property",
                        //                                                 config: {
                        //                                                    propertyToRender: "description"
                        //                                                 }
                        //                                              }
                        //                                           ]
                        //                                        }
                        //                                     },
                        //                                     {
                        //                                        name: "alfresco/lists/views/layouts/Cell",
                        //                                        config: {
                        //                                           additionalCssClasses: "mediumpad",
                        //                                           widgets: [
                        //                                              {
                        //                                                 name: "alfresco/renderers/Property",
                        //                                                 config: {
                        //                                                    propertyToRender: "status"
                        //                                                 }
                        //                                              }
                        //                                           ]
                        //                                        }
                        //                                     },
                        //                                     {
                        //                                        name: "alfresco/lists/views/layouts/Cell",
                        //                                        config: {
                        //                                           additionalCssClasses: "mediumpad",
                        //                                           widgets: [
                        //                                              {
                        //                                                 name: "alfresco/renderers/Date",
                        //                                                 config: {
                        //                                                    propertyToRender: "dueDate",
                        //                                                    simple: true
                        //                                                 }
                        //                                              }
                        //                                           ]
                        //                                        }
                        //                                     }
                        //                                  ]
                        //                               }
                        //                            }
                        //                         ]
                        //                      }
                        //                   }
                        //                ]
                        //             }
                        //          }
                        //       ]
                        //    }
                        // }
                     ]
                  }
               }
               // ,
               // {
               //    name: "alfresco/logging/DebugLog"
               // }
            ]
         }
      }
   ]
};