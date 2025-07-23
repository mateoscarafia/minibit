var scoreFilter = null;

const showResults = (res_inner) => {
  const shownObjects = [];
  const resultContainer = document.getElementById("exam-results-items-container-id")
  resultContainer.innerHTML = ""

  const defineClass = (score) => {
    if (score > 80) return "score-span-good"
    if (score < 60) return "score-span-bad"
    return "score-span-regular"
  }

  res_inner.forEach((res) => {
    if (!shownObjects.includes(`${res.content_id}-${res.user_id}`)) {
      shownObjects.push(`${res.content_id}-${res.user_id}`);
      const content_name = content_techs.filter((ctn) => ctn.content_id == res.content_id).pop()?.name
      resultContainer.innerHTML += `<div class="exam-results-item">
            <span>
              ${res.email}
            </span>
            <span><b>
               ${content_name}
              </b></span>
            <span class="date-span">
               ${res.created}
            </span>
            <span class=${defineClass(res.score)}>
               ${res.score}%
            </span>
          </div>`
    }
  })
}

const searchResults = () => {
  const email = document.getElementById("mail_search_id").value
  const content = document.getElementById("content_name_search_id").value
  const filtered = results.filter((res) => {
    if (email && content) return res.email.includes(email) && res.content_id == Number(content)
    if (email && !content) return res.email.includes(email)
    if (!email && content) return res.content_id == Number(content)
    return true
  })
  showResults(filtered)
}

const showContent = () => {
  const contentContainer = document.getElementById("content-items-container-id")
  contentContainer.innerHTML = "";
  content_techs.forEach((tech) => {
    contentContainer.innerHTML += `<div class="content-item">
            <span><b>
                ${tech.name}
              </b>
            </span>
            <a target="_blank" href="${window.location.protocol}//${window.location.host}/content-files/${tech.filename}">pdf</a>
           <span onclick="deleteContent(${tech.content_id})">Eliminar</span>
          </div>`
  })
}

const showUsers = (user_inner) => {
  const userContainer = document.getElementById("user-items-container-id")
  userContainer.innerHTML = "";

  const amountContents = content_question.filter((cnt) => cnt.questions.length).length

  const showEmoji = (u_score) => {
    if (u_score == 3) return "✅";
    if (u_score == 2) return "⚠️";
    return "⛔️";
  }

  user_inner.forEach((user) => {
    const userResults = results.filter((res) => res.user_id == user.id)
    const sum = userResults.reduce((total, item) => {
      return total + item.score;
    }, 0);
    const prom = Math.floor(sum / userResults.length)
    const userScore = isNaN(prom) ? 1 : prom > 80 ? 3 : prom < 60 ? 1 : 2;

    if(scoreFilter && scoreFilter != userScore) {
      return;
    }

    userContainer.innerHTML += `<div class="user-item user-score-${userScore}">
            <span>${showEmoji(userScore)}<b>
                ${user.email}
              </b>
            </span>
            <span style="width: 100px">
              pwd: ${user.password}
            </span>
            <span class="smaller-user-span">${userResults.length}/${amountContents}</span>
            <span style="font-weight: bold" class="smaller-user-span">${isNaN(prom) ? 0 : prom}%</span>
            <span onclick="deleteUser('${user.id}')">Eliminar</span>
          </div>`
  })
}

const showTestContent = () => {
  const testContainer = document.getElementById("tests-items-container-id")
  testContainer.innerHTML = "";
  content_question.forEach((content) => {
    testContainer.innerHTML += `
          <div onclick="openQuestionModal('${content.id}')" class="tests-item">
            <span><b>
                ${content.name}
              </b>
            </span>
          </div>
          `
  })
}

const displayQuestionForm = (questions) => {
  if (!questions) return
  const testContainer = document.getElementById("form-question-container-id");
  testContainer.innerHTML = ``;
  [...Array(50).keys()].forEach((item, index) => {
    testContainer.innerHTML += `
        <div class="answer-block">
          <p>Pregunta ${index + 1}</p><br />
          <textarea id="question_${index}_id" placeholder="Escriba pregunta"></textarea><br />

          <span>A</span><input id="answer_${index}_a_id" type="text" class="answer-input" placeholder="Respuesta A" /><br />
          
          <span>B</span><input id="answer_${index}_b_id" type="text" class="answer-input" placeholder="Respuesta B" /><br />
          
          <span>C</span><input id="answer_${index}_c_id" type="text" class="answer-input" placeholder="Respuesta C" /><br />
          
          <span>D</span><input id="answer_${index}_d_id" type="text" class="answer-input" placeholder="Respuesta D" /><br />
          
          <select class="correct-answer-select" name="correct_answer_${index}_name" id="correct_answer_${index}_id">
            <option value="" disabled selected>Respuesta correcta</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>`
  });
  [...Array(50).keys()].forEach((item, index) => {
    if (questions[index]) {
      document.getElementById(`question_${index}_id`).value = questions[index].question
      document.getElementById(`answer_${index}_a_id`).value = questions[index].answer_a
      document.getElementById(`answer_${index}_b_id`).value = questions[index].answer_b
      document.getElementById(`answer_${index}_c_id`).value = questions[index].answer_c
      document.getElementById(`answer_${index}_d_id`).value = questions[index].answer_d
      document.getElementById(`correct_answer_${index}_id`).value = questions[index].correct_answer
    }
  })
}

const openQuestionModal = (id) => {
  contentId = id;
  const filteredContent = content_question.filter((cnt) => cnt.id == id).pop()
  document.getElementById("tests-container-id-form").style.display = "block"
  displayQuestionForm(filteredContent.questions)
}

const postQuestions = async (id) => {
  const filteredContent = content_question.filter((cnt) => cnt.id == contentId).pop()
  const payload = [...Array(50).keys()].map((item, index) => {
    return {
      id: filteredContent.questions[index]?.id || null,
      question: document.getElementById(`question_${index}_id`).value,
      answer_a: document.getElementById(`answer_${index}_a_id`).value,
      answer_b: document.getElementById(`answer_${index}_b_id`).value,
      answer_c: document.getElementById(`answer_${index}_c_id`).value,
      answer_d: document.getElementById(`answer_${index}_d_id`).value,
      correct_answer: document.getElementById(`correct_answer_${index}_id`).value || "",
    }
  })
  fetch('/post-questions', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("minibit-token"),
    },
    body: JSON.stringify({
      contentId: contentId,
      payload: payload
    })
  }).then((response) => {
    if (!response.ok) {
      alert("Lo sentimos. Algo salió mal.")
    }
    alert("Respuestas guardadas con exito.")
    filteredContent.questions = payload;
  }).catch(() => {
    alert("Lo sentimos. Algo salió mal.")
  });
}

const deleteUser = async (id) => {
  const response = await fetch('/delete-user', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("minibit-token"),
    },
    body: JSON.stringify({
      userId: id,
    })
  }).then(() => {
    alert("Usuario eliminado.")
    users = users.filter((user) => Number(user.id) !== Number(id))
    showUsers(users)
  });
}

const deleteContent = async (id) => {
  const response = await fetch('/delete-content', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("minibit-token"),
    },
    body: JSON.stringify({
      contentId: id,
    })
  }).then(() => {
    alert("Contenido eliminado.")
    content_techs = content_techs.filter((tech) => tech.content_id != id)
    showContent()
  }).catch(() => {
    alert("Algo fallo.")
  });
}

const closeQuestionModal = () => {
  document.getElementById("tests-container-id-form").style.display = "none"
}

const displayContainers = (container) => {
  document.getElementById("exam-results-id").style.display = "none"
  document.getElementById("users-container-id").style.display = "none"
  document.getElementById("content-container-id").style.display = "none"
  document.getElementById("tests-container-id").style.display = "none"

  const admin_title = document.getElementById("admin_main_title_id")
  admin_title.innerHTML = container + " >";

  if (container == "usuarios") document.getElementById("users-container-id").style.display = "block"
  if (container == "resultados") document.getElementById("exam-results-id").style.display = "block"
  if (container == "contenido") document.getElementById("content-container-id").style.display = "block"
  if (container == "tests") document.getElementById("tests-container-id").style.display = "block"
}

const createContent = async () => {

  if (blockCreateContent) return
  blockCreateContent = true

  const fileInput = document.getElementById('file-id');
  const contentName = document.getElementById('content-name').value;
  const file = fileInput.files[0];

  // Check if a file was selected
  if (!file) {
    alert('Debe seleccionar un archivo');
    return;
  }

  // Check if the file is a PDF
  if (file.type !== 'application/pdf') {
    alert('El archivo debe ser PDF');
    return;
  }

  // Prepare the form data
  const formData = new FormData();
  formData.append('pdfFile', file);
  formData.append('contentName', contentName);

  try {
    // Send the file to the server
    fetch('/create-content', {
      method: 'POST',
      headers: {
        token: localStorage.getItem("minibit-token"),
      },
      body: formData
    }).then(async (response) => {
      if (response.ok) {
        const result = await response.json();
        alert('Contenido subido exitosamente.');
        content_techs.push({ name: result.name, filename: result.filename, content_id: result.id })
        content_question.push({ name: result.name, id: result.id, questions: [] })
        showContent()
        showTestContent()
      } else {
        throw new Error('Upload failed');
      }
    }).catch(() => {
      alert('Lo sentimos. Algo falló.');
    }).finally(() => {
      blockCreateContent = false
    })
  } catch (error) {
    alert('Lo sentimos. Algo falló.');
  }
}

const searchUser = () => {
  const email = document.getElementById("email").value || "";
  const filtered_users = users.filter((us)=> us.email.includes(email))
  showUsers(filtered_users)
}

const searchUserScore = (score) => {
  scoreFilter = score
  showUsers(users)
}

const createUser = async () => {

  const email = document.getElementById("email").value || "";
  const password = document.getElementById("password").value || "";

  if (!email || !password) {
    alert("Datos incorrectos");
    return;
  }

  fetch(`${window.location.protocol}//${window.location.host}/create-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("minibit-token"),
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(async (response) => {
    if (!response.ok) {
      alert("Lo sentimos, algo falló.");
      return
    }
    alert("Usuario creado");

    const result = await response.json();
    const userContainer = document.getElementById("user-items-container-id")

    users.push({ email: email, password: password, id: result.user })
    showUsers(users)
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

  }).catch(() => {
    alert("Lo sentimos, algo falló.");
  });
}

setTimeout(() => {
  showContent()
  showUsers(users)
  displayQuestionForm()
  showTestContent()
  showResults(results)
}, 100)