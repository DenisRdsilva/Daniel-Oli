
        var files = [];
        var fileReaders = [];
        var imageLinksArray = [];
        var galnumber;

        const imgdiv = document.getElementById('imagesdiv');
        const selbtn = document.getElementById('selimgsbtn');
        const addbtn = document.getElementById('addprodbtn');
        const proglab = document.getElementById('loadlab');
        const backbtn = document.getElementById('backbutton');

        backbtn.disabled = true;

        const name = ['artevive', 'devaneios', 'natureza', 'selvapedra', 'trabalhadores'];

        function OpenFileDialog() {
            let inp = document.createElement('input');
            inp.type = 'file';
            inp.multiple = 'multiple';

            inp.onchange = (e) => {
                AssignImgsToFilesArray(e.target.files);
                CreateImgTags();
            }

            inp.click();
        }

        function AssignImgsToFilesArray(thefiles) {
            let num = files.length + thefiles.length;
            let looplim = (num <= 200) ? thefiles.length : (200 - files.length);

            for (let i = 0; i < looplim; i++) {
                files.push(thefiles[i]);
            }

            if (num > 200) {
                alert("O limite de 100 imagens for excedido")
            }

            alert('Foram selecionadas ' + files.length + " imagens.");
        }

        function CreateImgTags(e) {
            imgdiv.innerHTML = '';
            imgdiv.classList.add('imagesDivStyle');

            for (let i = 0; i < files.length; i++) {
                fileReaders[i] = new FileReader();

                fileReaders[i].onload = function () {
                    var img = document.createElement('img');
                    img.id = 'imgNo' + i;
                    img.classList.add('imgs');
                    img.src = fileReaders[i].result;
                    imgdiv.append(img);
                }

                fileReaders[i].readAsDataURL(files[i]);
            }
        } //Shows the images in the screen

        /*
        let lab = document.getElementById("label");
        lab.innerHTML = 'Descartar imagens';
        lab.style = 'cursor:pointer; display:block; color:navy; font-size:12px';
        lab.addEventListener('click', ClearImages);
        imgdiv.append(lab);
        */
        /*
        function ClearImages() {
            files = [];
            imageLinksArray = [];
            imgdiv.innerHTML = '';
            imgdiv.classList.remove('imagesDivStyle')
        }*/

        function getShortTitle() {
            let namey = name[galnumber-1];
            return namey.replace(/[^a-zA-Z0-9]/g, "");
        }

        function getImageUploadProgress() {
            return "Images Uploaded " + imageLinksArray.length + ' of ' + files.length;
        }

        function isAllImagesUploaded() {
            return imageLinksArray.length == files.length;
        }

        function RestoreBack() {
            selbtn.disabled = false;
            addbtn.disabled = false;
        }

        selbtn.addEventListener('click', OpenFileDialog);
        addbtn.addEventListener('click', uploadAllImages);
        backbtn.addEventListener('click', backToStart);

        function backToStart() {
            window.location.href = "upload.html"
        }

        function uploadAllImages() {
            selbtn.disabled = true;
            addbtn.disabled = true;

            imageLinksArray = [];
            galnumber = prompt('Escolha uma das galerias: ');

            for (let i = 0; i < files.length; i++) {
                uploadAnImage(files[i], i);
            }
        }

        function uploadAnImage(imgToUpload, imgNo) {

            const metadata = {
                contentType: imgToUpload.type
            };

            const storage = getStorage();

            const imageAddress = "theImages/" + getShortTitle() + "/img#" + (imgNo + 1);

            const storageRef = sRef(storage, imageAddress);

            const uploadTask = uploadBytesResumable(storageRef, imgToUpload, metadata);

            uploadTask.on('state_changed', (snapshot) => {
                proglab.innerHTML = getImageUploadProgress();
            },

                (error) => {
                    alert("Erro no upload das imagens");
                },

                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        imageLinksArray.push(downloadURL);
                        if (isAllImagesUploaded()) {
                            proglab.innerHTML = "Todas as imagens foram adicionadas";
                            uploadAProduct();
                        }
                    })
                },
                backbtn.disabled = false
            )
        }

        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
        
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries

        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyAny_6AT2YAYjPttmne0jygcqOWtu23lvA",
            authDomain: "danielolifotografias.firebaseapp.com",
            databaseURL: "https://danielolifotografias-default-rtdb.firebaseio.com",
            projectId: "danielolifotografias",
            storageBucket: "danielolifotografias.appspot.com",
            messagingSenderId: "1084089897568",
            appId: "1:1084089897568:web:35fcfd9ddedf03620ae905"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);

        // Initialize Database
        import { getDatabase, ref, set, child, update, remove } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
        const realdb = getDatabase(app);

        // Initialize Storage
        import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";

        function uploadAProduct() {
            set(ref(realdb, "TheProductRealdb/"+ getShortTitle()), {
                LinksOfImagesArray: imageLinksArray
            });

            alert("As imagens foram adicionadas com sucesso!");
            RestoreBack();
        }
