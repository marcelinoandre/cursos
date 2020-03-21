'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
  project() {
    //a tarefa pertence a um projeto
    return this.belongsTo('App/Models/Project')
  }

  user() {
    //a tarefa pertence a um usuario
    return this.belongsTo('App/Models/User')
  }

  file() {
    //a tarefa pertence a um arquivo
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Task
