import React, { useState } from 'react';

function Homep() {
    const [insertPhoto, setInsertPhoto] = useState('');

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setInsertPhoto(reader.result);
            });
            reader.readAsDataURL(file);
        } else {
            setInsertPhoto('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {'photo': insertPhoto};

            const response = await fetch('http://localhost:8085/addPhoto', {
                method: 'POST',
                body: formData, 
            });

        // if (response.status === 200) {
        //     alert('Enregistrement réussi');
        // } else {
        //     alert('Erreur lors de l\'enregistrement');
        // }
        console.log('test',formData);
    };

    return (
        <div className="container mx-auto py-8 photo-section">
            <h1 className="text-2xl font-bold mb-4">Ajouter une photo</h1>

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="max-w-lg bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                    <label htmlFor="photo" className="block text-gray-700 text-sm font-bold mb-2">Nouvelle photo:</label>
                    <input type="file" name="photo" id="photo" onChange={handlePhotoChange} className="border border-gray-300 p-2 w-full" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Aperçu:</label>
                    <div className="preview-container rounded-lg border-dashed border-2 border-gray-300 p-4">
                        <img src={insertPhoto} alt="Aperçu de la photo" className="w-full h-auto" />
                    </div>
                </div>

                <div className="mt-6">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                    Enregistrer
                    </button>

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Envoyer
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Homep;
