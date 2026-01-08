


```json
        {
            "person": {
                "id": "33",
                "name": "Post Man",
                "identificationType": "cc",
                "identificationNumber": "47478080"
            },
            "assignment": {
                "organization": {
                    "details": {
                        "name": "MTS",
                        "activity": "Actividades De Administracion Empresarial",
                        "organizationType": "company",
                        "identificationNumber": "830142201-4",
                        "identificationType": "NIT"
                    },
                    "administrative": {
                        "name": "Administrativo MTS",
                        "email": "adminmts@mts.com",
                        "phone": "3004321922"
                    },
                    "legalRepresentative": {
                        "name": "Rep Legal MTS",
                        "email": "replegalmts@mts.com",
                        "phone": "3144321922"
                    },
                    "rules": {
                        "employees": {
                            "employeeAccountValidationByCreator": true,
                            "arrivalGracePeriodMinutes": 15,
                            "overdueExitNotificationMinutes": 15
                        },
                        "guests": {
                            "inviteeValidationByCreator": true,
                            "arrivalGracePeriodMinutes": 15,
                            "overdueExitNotificationMinutes": 15
                        },
                        "admins": {
                            "alertNotificationRecipients": [],
                            "authorizeTecniPassAdminForAllAuthorizations": true
                        }
                    },
                    "meta": {
                        "id": "14",
                        "createdAt": "2025-11-21T13:48:28.815294-05:00",
                        "updatedAt": "2025-11-21T13:48:28.815336-05:00"
                    }
                },
                "property": {
                    "details": {
                        "shortName": "EC100",
                        "name": "EcoTower 100",
                        "address": "AC 100 #19a-30",
                        "type": "office",
                        "geolocation": null
                    },
                    "parking": {
                        "hasParking": true,
                        "isVisitorParkingEnabled": false,
                        "visitorParkingPrice": null,
                        "visitorParkingTimeUnit": null
                    },
                    "rules": {
                        "civilWorksWarning": ""
                    },
                    "meta": {
                        "id": "2",
                        "createdAt": "2025-11-21T13:48:28.832427-05:00",
                        "updatedAt": "2025-11-21T13:48:28.832471-05:00"
                    }
                },
                "isAlertNotificationRecipient": false,
                "role": {
                    "id": 4,
                    "name": "Funcionario | Empleado",
                    "description": "Persona que trabaja o reside en la unidad inmobiliaria.",
                    "permissions": {
                        "contracts": {
                            "read": "noAccess",
                            "create": "noAccess",
                            "update": "noAccess",
                            "delete": "noAccess"
                        },
                        "events": {
                            "read": "noAccess",
                            "create": "noAccess",
                            "update": "noAccess",
                            "delete": "noAccess"
                        },
                        "organizations": {
                            "read": "organization",
                            "create": "noAccess",
                            "update": "noAccess",
                            "delete": "noAccess"
                        },
                        "properties": {
                            "read": "property",
                            "create": "noAccess",
                            "update": "noAccess",
                            "delete": "noAccess"
                        },
                        "units": {
                            "read": "individual",
                            "create": "noAccess",
                            "update": "noAccess",
                            "delete": "noAccess"
                        },
                        "users": {
                            "read": "individual",
                            "create": "individual",
                            "update": "individual",
                            "delete": "individual"
                        },
                        "invitations": {
                            "read": "individual",
                            "create": "individual",
                            "update": "individual",
                            "delete": "individual"
                        },
                        "roles": {
                            "read": "noAccess",
                            "create": "noAccess",
                            "update": "noAccess",
                            "delete": "noAccess"
                        }
                    },
                    "rules": {
                        "requiresAuthorizationDocument": false
                    },
                    "is_active": true
                },
                "email": "postman@gmail.com"
            },
            "authentication": {
                "authCapabilities": {}
            },
            "access": {
                "daysRestrictions": [],
                "zones": [
                    {
                        "details": {
                            "name": "Lobby Principal",
                            "propertyId": "2"
                        },
                        "devices": [],
                        "meta": {
                            "id": "3",
                            "createdAt": "2025-11-21T13:48:28.865055-05:00",
                            "updatedAt": "2025-11-21T13:48:28.865087-05:00"
                        }
                    }
                ],
                "parkings": [
                    {
                        "details": {
                            "name": "Parking V-101",
                            "unitType": "parking",
                            "usageType": "rentableByOwner",
                            "floor": 1,
                            "area": "10.00",
                            "coefficient": null,
                            "shortName": "PQ-V101",
                            "id": "17"
                        },
                        "ownership": {
                            "ownerId": "Tecni"
                        },
                        "property": {
                            "id": "2"
                        },
                        "contact": {
                            "phone": "3005716503"
                        },
                        "features": {
                            "hasDuplicator": false,
                            "isForDisabled": false
                        },
                        "parking": {
                            "capacity": 1,
                            "vehicleType": "car",
                            "parkingType": "private"
                        },
                        "meta": {
                            "id": "17",
                            "createdAt": "2025-11-21T13:48:29.002200-05:00",
                            "updatedAt": "2025-11-21T13:48:29.002247-05:00"
                        }
                    }
                ],
                "startDate": "2026-01-03T05:00:00Z",
                "endDate": null
            },
            "meta": {
                "id": "30",
                "accessStatus": "inactive",
                "userStatus": "pendingRegistration"
            }
        }
```