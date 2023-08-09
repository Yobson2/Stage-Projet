import React, { useState } from 'react'; // Import React as well
import { Link, useNavigate } from 'react-router-dom';

import '../styles/form.css';

function Home() {
    const navigation = useNavigate();
    const [formValues, setFormValues] = useState({
        nom: '',
        email: '',
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
            nom: '',
            email: '',
            image: null,
        });
    };

    const homePage = () => {
        navigation('/');
    };

    const handleSign = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8085/addPhoto', {
            method: 'POST',
            body: JSON.stringify(formValues),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        console.log('reponse',response)
        if (response.status === 200) {
            alert('Enregistrement réussi');
        } else {
            alert('Erreur lors de l\'enregistrement');
        }
        resetForm();
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
    const fetchAllData = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8085/allData', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            console.log('reponse',response)
            if (response.status === 200) {
                alert('Envoi réussi');
            } else {
                alert('Erreur lors de l\'envoi');
            }
        } catch (error) {
            console.error('Error while fetching data:', error.message);
        }
    };
    
    
    

    return (
        <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">Enregistrement</h1>
            <form >
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
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={handleSign}>
                    Enregistrer
                    </button>

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchAllData}>
                        Envoyer
                    </button>
                </div>
            </form>
            
        </div>
    </div>
    );
}

export default Home;
