// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// Plugins
import FirebaseAuth from './plugins/FirebaseAuth'
import Firebase from 'firebase'
import BodyScroll from './plugins/BodyScroll'
import Router from './plugins/Router'
import './plugins/Material'
import './plugins/Resource'
import './plugins/Filters'
import './plugins/Style.scss'
import 'cropperjs/dist/cropper.min.css'
import 'cropperjs/dist/cropper.min.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  template: '<App/>',
  components: { App },
  beforeCreate () {
    FirebaseAuth.auth(auth => {
      // Set Auth
      if (auth && auth.uid) this.uid = auth.uid
      else this.uid = null

      // Bind to user data
      if (auth) {
        if (this.user['.key']) {
          console.log('user already bound.')
        } else {
          console.log('Bind user.')
          this.$bindAsObject('user', Firebase.database().ref('user/' + this.auth.uid))
        }
      } else if (this.user['.key']) {
        console.log('Unbind user')
        this.$unbind('user')
        this.user = this.setUser()
      }

      // Re-route on auth event
      if (auth) {
        // Logged in but stitting on a login page
        if (this.$route.path === '/' || this.$route.path === '/signin' || this.$route.path === '/signup') {
          console.log('Re-route home')
          this.$router.replace('/home')
        }
      } else {
        // Not logged in and not sitting on a login page
        if (this.$route.path !== '/' && this.$route.path !== '/signin' && this.$route.path !== '/signup') {
          console.log('Re-route signin')
          this.$router.replace('/signin')
        }
      }
    })
  },
  data () {
    return {
      scroll: BodyScroll,
      drawerOpen: false,
      uid: null,
      user: this.setUser()
    }
  },
  methods: {
    setProfile () {
      return {
        locationName: 'Not Set',
        displayName: '',
        pictureURL: '',
        age: 20, // Timestamp
        bio: '',
        sex: 'na'
      }
    },
    setUser () {
      return {
        locationName: 'Not Set',
        locationLong: -109.3495,
        locationLat: -27.113,
        displayName: '',
        pictureURL: '',
        firstName: '',
        lastName: '',
        distance: 20,
        birthday: 0, // Timestamp
        email: '',
        bio: '',
        sex: 'na'
      }
    }
  }
})
