
Este es un esquema de ejemplo para datos de usuario en una API, utilizando Zod para la validación de tipos en TypeScript.

```typescript
/**
 * Schema for API user data
 */
const UserApiSchema = z.object({
	id: z.number(),
	user: z.number(),
	organization: OrganizationApiSchema,
	property: z
		.object({
			id: z.string(),
			name: z.string(),
		})
		.optional(),
	userRole: z.string(),
	name: z.string(),
	idType: IdTypeEnum,
	idNumber: z.string(),
	email: z.string().email(),
	position: z.string().optional(),
	authorizationDocument: z.string().optional(),
	authCapabilities: AuthCapabilitiesSchema,
	accessStartDate: z.date(),
	accessEndDate: z.date().optional(),
	accessStatus: AccessStatusEnum,
	userStatus: UserStatusEnum,
	daysRestrictions: z.array(TimeRestrictionSchema),
});
```