import { useMutation } from "@apollo/client";
import { useState } from "react";
import { SAVE_COMPTE } from "../graphql/mutations";
import { GET_ALL_COMPTES } from "../graphql/queries";

function AccountForm() {
  const [formData, setFormData] = useState({
    solde: "",
    type: "",
    dateCreation: "",
  });

  const [saveCompte] = useMutation(SAVE_COMPTE, {
    refetchQueries: [{ query: GET_ALL_COMPTES }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const date = new Date(formData.dateCreation);
      const jour = String(date.getDate()).padStart(2, "0");
      const mois = String(date.getMonth() + 1).padStart(2, "0");
      const annee = date.getFullYear();
      const formattedDate = `${jour}/${mois}/${annee}`;

      await saveCompte({
        variables: {
          compte: {
            solde: parseFloat(formData.solde),
            type: formData.type,
            dateCreation: formattedDate,
          },
        },
      });

      setFormData({
        solde: "",
        type: "",
        dateCreation: "",
      });
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div className="bg-[#0F172A] rounded-xl p-6">
      <h2 className="text-xl text-white font-normal mb-6">Créer un compte</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white mb-2">Solde initial</label>
          <input
            type="number"
            step="0.01"
            required
            value={formData.solde}
            onChange={(e) =>
              setFormData({ ...formData, solde: e.target.value })
            }
            className="w-full bg-[#1E293B] text-white px-4 py-3 rounded-lg focus:outline-none"
            placeholder="Entrez le solde"
          />
        </div>

        <div>
          <label className="block text-white mb-2">Type de compte</label>
          <select
            required
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-[#1E293B] text-white px-4 py-3 rounded-lg focus:outline-none appearance-none"
          >
            <option value="">Sélectionnez un type</option>
            <option value="COURANT">Compte Courant</option>
            <option value="EPARGNE">Compte Épargne</option>
          </select>
        </div>

        <div>
          <label className="block text-white mb-2">Date de création</label>
          <input
            type="date"
            required
            value={formData.dateCreation}
            onChange={(e) =>
              setFormData({ ...formData, dateCreation: e.target.value })
            }
            className="w-full bg-[#1E293B] text-white px-4 py-3 rounded-lg focus:outline-none"
            placeholder="dd/mm/yyyy"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#4F46E5] text-white py-3 rounded-lg mt-4 hover:bg-[#4338CA] transition-colors"
        >
          Créer le compte
        </button>
      </form>
    </div>
  );
}

export default AccountForm;
