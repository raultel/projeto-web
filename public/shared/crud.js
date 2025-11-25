import { api_get, api_create, api_delete, api_get_by_id, api_update } from "/shared/api.js"

function toDateOnly(datetimeString) {
    const match = datetimeString.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!match) return ""; // fallback
    return `${match[1]}-${match[2]}-${match[3]}`;
}

/* Função chamada quando se clica no botão de editar */
export function edit_action(item, modal, form) {
    /* Revela o modal e guarda o ID */
    modal.dataset.value=item.id;
    modal.style.display = "flex";
    document.getElementById("file").value = "";

    /* Preenche o formulário com os valores do item que será atualizado/editado */
    for (const key of Object.keys(item)) {
        const input = form.querySelector(`[name="${key}"]`);
        if (!input) continue;
        if (input.type === "date") {
            input.value = toDateOnly(item[key]);   // convert
        } else {
            input.value = item[key];
        }
    }
}

/* Função chamada ao clicar no botão de deletar o card */
export async function delete_item(model_name, id) {
    /* Deleta do bd */
    try {
        await api_delete(model_name, id);
    } catch (err) {
        console.error(err);
    }

    /* Pega o card do DOM e remove apenas ele */
    document.querySelectorAll(".card").forEach(function(card) {
        if (Number(card.dataset.value) === Number(id)) {
            card.remove();
        }
    });
}

/* Função chamada após um novo item ser inserido no bd */
function append_new_item(model_name, item, build_card) {
    /* Cria um card e insere no DOM */
    const div = build_card(item);
    document.getElementById(model_name + "-collection").appendChild(div);
}

/* Função chamada após um item ser atualizado no bd */
function update_item_div(item, id, build_card) {
    /* Cria o card atualizado */
    const new_card = build_card(item.data);

    /* Procura o card antigo e substitui pelo novo no DOM */
    document.querySelectorAll(".card").forEach(function(card) {
        if (card.dataset.value === id) {
            card.replaceWith(new_card);
        }
    });
}

/* Prepara o formulário usado para editar e atualizar cards/items */
export function setup_form(form, modal, model_name, build_card)
{
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        /* O dataset.value guarda -1 se nenhum item está sendo criado
         * (ou seja, um novo item foi criado) e o ID do item a ser editado,
         * caso se esteja no meio de uma atualização */
        try {
            if (Number(modal.dataset.value) === -1) {
                let item = await api_create(model_name, formData); // BD
                append_new_item(model_name, item, build_card); // DOM
            }
            else {
                let item = await api_update(model_name, modal.dataset.value, formData); // BD
                update_item_div(item, modal.dataset.value, build_card) // DOM
            }
        } catch (err) {
            console.error(err);
        }
    });
}

/* Essa função cria e prepara os botões EDIT e DELETE do crud para um card */
export function setup_admin_view(item, modal, form, model_name, build_card) {
    const div = document.createElement("div");
    div.classList.add("admin-buttons");

    div.innerHTML = `
    <button class="delete_btn"><img src="/assets/buttons/del_btn.svg"></button>
    <button class="edit_btn"><img src="/assets/buttons/edit_btn.svg"></button>
    `
    const deleteBtn = div.getElementsByClassName('delete_btn')[0];
    const editBtn   = div.getElementsByClassName('edit_btn')[0];

    editBtn.addEventListener("click", () => edit_action(item, modal, form));
    deleteBtn.addEventListener("click", () => delete_item(model_name, item.id));

    return div;
}
