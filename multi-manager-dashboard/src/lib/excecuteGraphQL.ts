import { GraphQLError } from "graphql";
import { TypedDocumentString } from "../gql/graphql";

type GrapghQLResponse<GrapgQLData> = { data: GrapgQLData } | { errors: GraphQLError[]};

export const executeGQL = async <Result, Variables>(document: TypedDocumentString<Result, Variables>, variables?: Variables): Promise<Result> => {
    const response = await fetch("https://api.thegraph.com/subgraphs/name/kquach12/vault-testing-op", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: document.toString(),
            variables
        })
    });

    const result = (await response.json()) as GrapghQLResponse<Result>;

    if ("errors" in result) {
        throw new Error(result.errors[0].message);
    }

    return result.data;
}