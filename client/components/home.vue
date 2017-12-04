<template>
  <v-app id="inspire">
    <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.width > 1264" v-model="drawer" class="grey lighten-4" app>
      <v-list dense class="grey lighten-4">
        <v-layout row justify-center align-center class="my-4">
            <v-dialog v-model="importDialog" persistent max-width="640">
                <v-btn dark fab small color="blue darken-1" slot="activator">  
                    <v-icon>cloud_upload</v-icon>
                </v-btn>
                <v-card>
                    <v-card-title class="headline">Paste path data</v-card-title>
                    <v-card-text>
                        <v-flex>
                            <v-text-field v-model="importPath" multi-line></v-text-field>
                        </v-flex>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click.native="importDialog = false">import</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="exportDialog" persistent max-width="640">
                <v-btn :dark="exportPath !== ''" :disabled="exportPath === ''" fab small color="blue lighten-1" slot="activator">
                    <v-icon>cloud_download</v-icon>
                </v-btn>
                <v-card>
                    <v-card-title class="headline">Processed path data</v-card-title>
                    <v-card-text>{{exportPath}}</v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="exportDialog = false">got it!</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-btn :dark="importPath !== ''" :disabled="importPath === ''" @click="normalize" color="blue darken-4" :loading="showLoader">process</v-btn>
        </v-layout>
        <v-divider dark class="my-4"></v-divider>
          <v-layout row align-center>
            <v-flex xs6>
              <v-subheader>Coordinates</v-subheader>
            </v-flex>
          </v-layout>
          <v-list-tile @click="setMakeNone">
            <v-list-tile-action><v-icon>crop</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title :class="makeAbsolute || makeRelative ? 'grey--text' : ''">None</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
           <v-list-tile @click="setMakeAbsolute">
            <v-list-tile-action><v-icon>crop_square</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title :class="makeAbsolute ? '': 'grey--text'">Absolute coordinaes</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
           <v-list-tile @click="setMakeRelative">
            <v-list-tile-action><v-icon>crop_free</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title :class="makeRelative ? '': 'grey--text'">Relative coordinaes</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
             <v-divider dark class="my-4"></v-divider>
           <v-layout row align-center>
            <v-flex xs6>
              <v-subheader>Commands</v-subheader>
            </v-flex>
          </v-layout>
            <v-list-tile @click="expandSmoothCurves = !expandSmoothCurves">
                <v-list-tile-action><v-icon>rounded_corner</v-icon></v-list-tile-action>
                <v-list-tile-content><v-list-tile-title :class="expandSmoothCurves ? '': 'grey--text'">Expand smooth curves</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
           <v-list-tile @click="arcsToBeziers = !arcsToBeziers">
            <v-list-tile-action><v-icon>track_changes</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title :class="arcsToBeziers ? '': 'grey--text'">Arcs to beziers</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
           <v-list-tile @click="convertToCurves = !convertToCurves">
            <v-list-tile-action><v-icon>linear_scale</v-icon></v-list-tile-action>
            <v-list-tile-content><v-list-tile-title :class="convertToCurves ? '': 'grey--text'">All segments to curves</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="grey" app absolute clipped-left>
      <v-toolbar-side-icon v-if="$vuetify.breakpoint.width <= 1264" @click="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title"><img src="/images/snower.png" /></span></span>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height class="grey lighten-4">
        <v-layout justify-center align-center>
        <svg width="500px" height="500px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path :d="exportPath" />
        </svg>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

export default {
    name: 'home',
    data: () => ({
        showLoader: false,
        makeAbsolute: false,
        makeRelative: false,
        convertToCurves: false,
        expandSmoothCurves: false,
        arcsToBeziers: false,
        importPath: '',
        exportPath: '',
        drawer: null,
        importDialog: null,
        exportDialog: null
    }),
    props: {
      source: String
    },
    methods: {
        setMakeNone(){
            this.makeAbsolute = false;
            this.makeRelative = false;
        },
        setMakeAbsolute(){
            this.makeAbsolute = true;
            this.makeRelative = false;
        },
        setMakeRelative(){
            this.makeAbsolute = false;
            this.makeRelative = true;
        },
        normalize() {
            this.showLoader = true;
            fetch("/normalize", {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    makeAbsolute: this.makeAbsolute,
                    makeRelative: this.makeRelative,
                    convertToCurves: this.convertToCurves,
                    expandSmoothCurves: this.expandSmoothCurves,
                    arcsToBeziers: this.arcsToBeziers,
                    path: this.importPath
                })
            })
            .then(res => res.json())
            .then(x => {
                this.exportPath = x.path;
                this.showLoader = false;
            });
}
    }
}
</script>

<style lang="stylus" scoped>
 .title
    img
        height: 80px
</style>