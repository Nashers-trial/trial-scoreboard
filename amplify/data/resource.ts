import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const trialDays = ["Fri", "Sat", "Sun"];
const trialLevels = ["PDC", "PSA1", "PSA2", "PSA3"];

const schema = a
  .schema({
    Team: a
      .model({
        teamId: a.id().required(),
        handlerName: a.string().required(),
        dogName: a.string().required(),
        trialLevel: a.enum(trialLevels),
        trialLeg: a.enum(["PDC", "1st", "2nd"]),
        trialDay: a.enum(trialDays),
        obOrder: a.integer(),
        obScore: a.float(),
        obResult: a.enum(["-", "PULL", "PASSED", "NOTPASSED", "DISQ", "BITE"]),
        proOrder: a.integer(),
        proScore: a.float(),
        proResult: a.enum(["-", "PULL", "PASSED", "NOTPASSED", "DISQ", "NOOUT"]),
        totalScore: a.float(),
        Result: a.enum(["-", "PASSED", "PASSEDDIST" , "NOTPASSED"])
      })
      .identifier(["teamId"]),
    LevelOrder: a
      .model({
        level: a.enum(trialLevels),
        order: a.integer().required()
      }),
    TrialDay: a
      .model({
        day: a.enum(trialDays),
        trialOrder: a.hasMany("LevelOrder", "order"),
        obComplete: a.boolean(),
        proComplete: a.boolean(),
        dayComplete: a.boolean()
      })
  }) 
  .authorization((allow) => [
    // Allow anyone auth'd with an API key to read scoreboard entries.
    allow.publicApiKey().to(['read']),
    // Allow signed-in user in the editors group to create, read, update,
    // and delete scoreboard entries.
    allow.group('editors'),
  ]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
