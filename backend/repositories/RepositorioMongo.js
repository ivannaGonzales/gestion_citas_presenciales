class RepositorioMongo {
    constructor(modelo) {
        if (!modelo) {
            throw new Error("RepositorioMongo requiere un modelo de Mongoose");
        }

        this.modelo = modelo;
    }

    create(data) {
        return this.modelo.create(data);
    }

    find(filter = {}) {
        return this.modelo.find(filter);
    }

    findOne(filter = {}) {
        return this.modelo.findOne(filter);
    }

    findById(id) {
        return this.modelo.findById(id);
    }

    update(id, data) {
        return this.modelo.findByIdAndUpdate(id, data, { new: true });
    }

    updateOne(filter, data) {
        return this.modelo.findOneAndUpdate(filter, data, { new: true });
    }

    delete(id) {
        return this.modelo.findByIdAndDelete(id);
    }
}

export { RepositorioMongo };
