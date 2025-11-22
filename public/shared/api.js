const token = localStorage.getItem("jwtToken");

export async function api_get(model) {
    const res = await fetch(`/api/${model}`);
    return await res.json();
}

export async function api_get_by_id(model, id) {
    const res = await fetch(`/api/${model}/${id}`);
    return await res.json();
}

export async function api_delete(model, id) {
    const res = await fetch(`/api/${model}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    return res.ok;
}

export async function api_update(model, id, formData) {
    const res = await fetch(`/api/${model}/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: formData
    });
    return await res.json();
}

export async function api_create(model, formData) {
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
