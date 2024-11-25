import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_ALL_COMPTES, DELETE_COMPTE } from "../graphql/queries";
import { TrashIcon } from "@heroicons/react/24/outline";

function AccountTable() {
  const { loading, error, data, refetch } = useQuery(GET_ALL_COMPTES);
  const [deleteCompte] = useLazyQuery(DELETE_COMPTE);

  const handleDelete = async (id) => {
    try {
      await deleteCompte({
        variables: { id },
        onCompleted: () => {
          refetch();
        },
      });
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">Erreur de chargement</div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <h2 className="text-xl text-blue-600 font-semibold p-4 border-b">
        Comptes Bancaires
      </h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Solde
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date Création
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.allComptes.map((compte) => (
            <tr key={compte.id}>
              <td className="px-6 py-4 whitespace-nowrap">{compte.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {compte.solde.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    compte.type === "EPARGNE"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {compte.type === "EPARGNE"
                    ? "Compte Épargne"
                    : "Compte Courant"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(compte.dateCreation).toLocaleDateString("fr-FR")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Êtes-vous sûr de vouloir supprimer ce compte ?"
                      )
                    ) {
                      handleDelete(compte.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccountTable;
