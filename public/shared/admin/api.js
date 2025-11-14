const token = localStorage.getItem("jwtToken");

export async function apiGet(model) {
    const res = await fetch(`/api/${model}`);
    return await res.json();
}

export async function apiGetById(model, id) {
    const res = await fetch(`/api/${model}/${id}`);
    return await res.json();
}

export async function apiDelete(model, id) {
    const res = await fetch(`/api/${model}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    return res.ok;
}

export async function apiUpdate(model, id, formData) {
    console.log(model,id)
    const res = await fetch(`/api/${model}/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: formData
    });
    return await res.json();
}

export async function apiCreate(model, formData) {
    const res = await fetch(`/api/${model}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: formData
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
}

