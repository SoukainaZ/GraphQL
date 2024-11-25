import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AccountForm from "./components/AccountForm";
import AccountTable from "./components/AccountTable";

const client = new ApolloClient({
  uri: "http://localhost:8082/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-600 py-4">
          <h1 className="text-2xl text-white font-bold px-6">
            Gestion Bancaire
          </h1>
        </header>

        <main className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Tableau à gauche */}
            <div>
              <AccountTable />
            </div>

            {/* Formulaire à droite */}
            <div>
              <AccountForm />
            </div>
          </div>
        </main>
      </div>
    </ApolloProvider>
  );
}

export default App;
