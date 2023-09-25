export type SideBarRoute = {
    name: string;
    image: string;
    path: string;
}
export const routes: SideBarRoute[] = [
    {
        name: "Dashboard",
        image: "charts-60.png",
        path: "/"
    },
    // {
    //     name: "Vaults",
    //     image: "safe-64.png",
    //     path: "/vaults"
    // },
    {
        name: "Strategies",
        image: "strategy-64.png",
        path: "/strategies"
    },
    {
        name: "Users",
        image: "users-48.png",
        path: "/users"
    },
    {
        name: "Transactions",
        image: "transactions-64.png",
        path: "/transactions"
    }
]