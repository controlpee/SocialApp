import React, { Component } from 'react'

class AddPhoto extends Component {

    handleAddPoto = (event) => {
        const image = event.target.files[0];
const formData = new FormData();
formData.append('image', image, image.name);
this.props.uploadImage(formData);
};

    handleEditPicture = () => {
        const fileInput = document.querySelector('#addPhotoInput');
        fileInput.click();
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default AddPhoto
