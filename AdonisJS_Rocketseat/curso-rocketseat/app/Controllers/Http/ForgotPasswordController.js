'use strict'

const cripyto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')
const moment = require('moment')

class ForgotPasswordController {
  async store({ request, response }) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)

      user.token = cripyto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()

      await Mail.send(
        ['emails.forgot_password'],
        {
          email,
          token: user.token,
          link: `${request.input('redirectUrl')}/?token=${user.token}`
        },
        message => {
          message
            .to(user.email)
            .from('marcelinoandre@gmail.com', 'André | Sisnuvem')
            .subject('Recuperação de senha')
        }
      )

      return user
    } catch (error) {
      // console.log(error.message)
      return response
        .status(error.status)
        .json({ err: { msg: 'Algo não deu certo' } })
    }
  }

  async update({ request, response }) {
    try {
      const { token, password } = request.all()
      const user = await User.findByOrFail('token', token)

      console.log(user, 'inicio..........')
      const tokenExpired = moment()
        .subtract('2', 'days')
        .isAfter(user.token_created_at)

      if (tokenExpired) {
        return response
          .status(401)
          .send({ err: { msg: 'Token inválido ou expirado' } })
      }

      console.log(user, 'MEI ..........')

      user.token = null
      user.token_created_at = null
      user.password = password
      await user.save()
      console.log(user, 'fim ..........')

      return response.status(200).json({ ok: 'dados atualizados' })
    } catch (error) {
      console.log(error)
      return response.status(error.status).send({ err: { msg: error.message } })
    }
  }
}

module.exports = ForgotPasswordController
