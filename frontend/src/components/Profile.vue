<template>
    <div class="level-item mt-4">
        <div class="is-flex is-align-items-center">
            <span class="name-member has-text-black is-size-5-fullhd ">Hi, </span>
            <div class="profile-box tabs mx-5">
                <img src="../assets/user_image_default.jpg">
                <!-- <img src="<%= user.image_user ? user.image_user : '/Images/user_image_default.jpg' %>" alt="user_img"> -->
                <a class="dropbtn" style="width: 100%;" @click="showDropdown = !showDropdown"></a>
            </div>
        </div>

        <div id="profileDropdown" class="tab-profile profile has-background-white px-5 py-2" :class="{'is-active' : showDropdown}">
            <a class="has-text-black" @click="showModel = !showModel; showDropdown = !showDropdown"><i class="fas fa-user mr-2"></i>Profile</a>
        </div>

        <!-- modal-add-task -->
        <div class="modal model-profile" :class="{'is-active' : showModel}">
            <div class="modal-background"></div>
            <div class="modal-card" style="width: 30rem;">
                <header class="modal-card-head">
                    <p class="modal-card-title has-text-weight-semibold">MY PROFILE</p>
                    <button class="delete btnDelete" aria-label="close" @click="showModel = !showModel"></button>
                </header>
                <form method="POST" action="/Dashboard" id="form-user" enctype="multipart/form-data">
                    <section class="modal-card-body px-5">
                        <div class="field is-flex is-align-items-center">
                            <div class="img-profile mr-5">
                                <!-- <img src="<%= user.image_user ? user.image_user : '/Images/user_image_default.jpg' %>"
                                    alt="user_img"> -->
                            </div>
                            <div class="is-flex is-flex-direction-column has-text-black" style="width: 65%;">
                                <label class="is-size-6 mb-1">Username</label>
                                <span class="boxuser">
                                    <input type="text"
                                        class="user-card px-4 py-3 is-size-4 has-text-weight-medium is-flex is-align-items-center"
                                        name="username" id="username" v-model="username">
                                    <i id="iconUsername" class="icon-user iconUsername fas fa-pen is-size-7"
                                        style="color: rgb(109, 109, 109); top: 23;" onclick="updateDataUser()"></i>
                                    <div class="file mt-4">
                                        <label class="file-label">
                                            <input class="file-input" type="file" name="user_img" id="file" ref="file">
                                            <span class="file-cta is-size-7">
                                                <span class="file-icon">
                                                    <i class="fas fa-upload"></i>
                                                </span>
                                                <span class="file-label">
                                                    Choose a file…
                                                </span>
                                            </span>
                                        </label>
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div class="field mt-3">
                            <div class="is-flex is-flex-direction-column has-text-black">
                                <label class="mb-1">First name</label>
                                <span class="boxuser">
                                    <input type="text"
                                        class="user-card px-4 py-3 has-text-weight-medium is-flex is-align-items-center"
                                        name="fname" id="fname" v-model="fname">
                                    <i id="iconFname" class="icon-user iconFname fas fa-pen is-size-7"
                                        style="color: rgb(109, 109, 109);" onclick="updateDataUser()"></i>
                                </span>
                            </div>
                        </div>
                        <div class="field mt-3">
                            <div class="is-flex is-flex-direction-column has-text-black">
                                <label class="mb-1">Last name</label>
                                <span class="boxuser">
                                    <input type="text"
                                        class="user-card px-4 py-3 has-text-weight-medium is-flex is-align-items-center"
                                        name="lname" id="lname" v-model="lname">
                                    <i id="iconLname" class="icon-user iconLname fas fa-pen is-size-7"
                                        style="color: rgb(109, 109, 109);" onclick="updateDataUser()"></i>
                                </span>
                            </div>
                        </div>
                        <div class="field mt-3">
                            <div class="is-flex is-flex-direction-column has-text-black">
                                <label class="mb-1">Email</label>
                                <span class="boxuser">
                                    <input type="text"
                                        class="user-card px-4 py-3 has-text-weight-medium is-flex is-align-items-center"
                                        name="email" id="email" v-model="email">
                                    <i id="iconEmail" class="icon-user iconEmail fas fa-pen is-size-7"
                                        style="color: rgb(109, 109, 109);" onclick="updateDataUser()"></i>
                                </span>
                            </div>
                        </div>
                        <div class="field mt-3">
                            <div class="is-flex is-flex-direction-column has-text-black">
                                <label class="mb-1">Password</label>
                                <span class="boxuser">
                                    <input type="text"
                                        class="user-card px-4 py-3 has-text-weight-medium is-flex is-align-items-center"
                                        name="password" id="password" v-model="password">
                                    <i id="iconPwd" class="icon-user iconPwd fas fa-pen is-size-7"
                                        style="color: rgb(109, 109, 109);" onclick="updateDataUser()"></i>
                                </span>
                            </div>
                        </div>
                    </section>

                    <footer class="modal-card-foot">
                        <button class="button is-black mr-3" type="submit">Update</button>
                        <a class="button btnCancel" @click="showModel = !showModel">Cancel</a>
                    </footer>
                </form>
            </div>
        </div>
        <!-- modal-add-task -->
    </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      fname: '',
      lname: '',
      email: '',
      password: '',
      file: null,
      showDropdown: false,
      showModel: false,
    }
  },
}
</script>