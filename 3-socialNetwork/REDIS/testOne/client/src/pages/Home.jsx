import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "../styles/form.css";

function Home() {
    const navigation = useNavigate();
    const [formValues, setFormValues] = useState({
        nom: "",
        email: "",
        image: null,
    });

    const { nom, email, image } = formValues;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const resetForm = () => {
        setFormValues({
            nom: "",
            email: "",
            image: null,
        });
    };

    const homePage = () => {
        navigation('/');
    };

    const handleSign = async (e) => {
        e.preventDefault();
        const response=await fetch('http://localhost:8085/addPhoto', {
            method: 'POST',
            body: JSON.stringify(formValues),
            headers: {
                'Content-Type': 'application/json',
                 Accept:"application/json",
                "Access-Control-Allow-Origin":"*"
            }
        })
       if(response.status===200){
         alert('Enregistrement reussi')
       }else{
        alert('Enregistrement reussi')
       }
        resetForm();
        console.log('test',formValues)
    };

    const baseImage = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setFormValues({
                    ...formValues,
                    image: reader.result,
                });
            });
            reader.readAsDataURL(file);
        } else {
            setFormValues({
                ...formValues,
                image: null,
            });
        }
    };
    // const fetchAllData = async () => {
    //     try {
    //         const response = await fetch('http://localhost:8082/allData', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         });

    //         if (response.ok) {
    //             const data = await response.json();
    //             console.log(data);  // Affichez les données dans la console (ou faites autre chose avec les données)
    //         } else {
    //             console.error('Erreur lors de la récupération des données');
    //         }
    //     } catch (error) {
    //         console.error('Erreur lors de la requête:', error);
    //     }
    // };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">Enregistrement</h1>
                <form onSubmit={handleSign}>
                    <div className="mb-6">
                        <label htmlFor="nom" className="block mb-2 text-sm text-gray-600">Nom</label>
                        <input type="text" id="nom" name="nom" value={nom} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required onChange={handleChange} />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm text-gray-600">Email</label>
                        <input type="email" id="email" name="email" value={email} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required onChange={handleChange} />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm text-gray-600">Photo</label>
                        <input type="file" id="image" name="image" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required onChange={baseImage} />
                    </div>
                    <div className="m-6">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                        Enregistrer
                        </button>

                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Envoyer
                        </button>
                    </div>
                </form>
                
            </div>
            {/* <div className="m-6">
                <button onClick={fetchAllData} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Afficher toutes les données
                </button>
            </div> */}
        </div>
    );
}

export default Home;