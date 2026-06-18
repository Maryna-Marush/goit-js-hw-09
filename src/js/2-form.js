const formData = {
  email: "",
  message: ""
};


const STORAGE_KEY = "feedback-form-state";
const form = document.querySelector(".feedback-form");
const emailInput = form.elements.email;
const messageInput = form.elements.message;


function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      
      
      formData.email = parsedData.email ?? "";
      formData.message = parsedData.message ?? "";

     
      emailInput.value = formData.email;
      messageInput.value = formData.message;
    } catch (error) {
      console.error("Помилка парсингу даних з localStorage:", error);
    }
  }
}


populateForm();


form.addEventListener("input", (event) => {
  
  formData[event.target.name] = event.target.value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});


form.addEventListener("submit", (event) => {
 
  event.preventDefault();

  if (formData.email === "" || formData.message === "") {
    alert("Fill please all fields");
    return;
  }

  console.log("Submitted Data:", formData);

  localStorage.removeItem(STORAGE_KEY);

  formData.email = "";
  formData.message = "";

  form.reset();
});