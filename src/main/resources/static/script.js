function checkFiles(files) {
    console.log(files);

    if (files.length != 1) {
        alert("Bitte genau eine Datei hochladen.");
        return;
    }

    const fileSize = files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 10) {
        alert("Datei zu groß (max. 10MB)");
        return;
    }

    document.getElementById('answerPart').classList.remove('d-none');
    const file = files[0];

    // Preview
    if (file) {
        document.getElementById('preview').src = URL.createObjectURL(files[0]);
    }

    // Upload
    const formData = new FormData();
    formData.append("image", file);

    fetch('/analyze', {
        method: 'POST',
        body: formData
    }).then(response => {
        console.log(response);
        return response.text();
    }).then(text => {
        document.getElementById('answer').innerHTML = text;
    }).catch(error => {
        console.error(error);
    });
}
