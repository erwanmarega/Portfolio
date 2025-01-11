const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.error("Erreur : La variable d'environnement 'VITE_API_URL' n'est pas définie.");
}

export const fetchData = async (endpoint, options = {}) => {
  try {
    const url = `${API_URL}${endpoint}`;
    console.log(`Appel API vers : ${url}`); 

    const defaultOptions = {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json', 
      },
    };

    const finalOptions = { ...defaultOptions, ...options };

    if (options.body) {
      console.log("Données envoyées :", options.body); 
      finalOptions.body = JSON.stringify(options.body);
    }

    const response = await fetch(url, finalOptions);

    if (!response.ok) {
      const errorText = `Erreur HTTP ! Statut : ${response.status}`;
      console.error(errorText);
      throw new Error(errorText);
    }

    const data = await response.json();
    console.log("Réponse reçue :", data);
    return data;
  } catch (error) {
    console.error('Erreur lors de l\'appel API :', error.message);
    throw error;
  }
};
