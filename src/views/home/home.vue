<template>
  <div class="page-home coa-padding-s">
    <PageHeader title="[ HOMEPAGE ]" />
    <!-- [ add page content here ] -->
  </div>
</template>

<script lang="js">
// @ is an alias to /src
import PageHeader from "@/components/PageHeader";

export default {
  name: "home",
  components: {
    PageHeader
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/index.scss";

.page-home {
  margin: 0;
  padding: $size-s $size-m;
  background-color: $color-white;
}
</style>
