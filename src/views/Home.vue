<template>
  <div>
      <div class="container text-center d-flex justify-content-center align-items-center flex-column" style="height:100vh"">
            <h1>Gobang!</h1>
            <router-link to="/online" class="link">
                <button class="btn btn-primary btn-block btn-lg">
                    Online
                </button>
            </router-link>
            <button class="btn btn-warning btn-lg">
                <router-link to="/private" class="link">
                    Private
                </router-link>
            </button>
            </router-link>
            <router-link to="/history" class="link">
                <button class="btn btn-info btn-block btn-lg">
                    History
                </button>
            </router-link>
            <router-link to="/test" class="link">
                <button class="btn btn-secondary btn-block btn-lg">
                    test
                </button>
            </router-link>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">With textarea</span>
                </div>
                <textarea class="form-control" aria-label="With textarea"></textarea>
            </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style lang="scss">
    .link{
        margin:10px 0; 
    }
</style>
