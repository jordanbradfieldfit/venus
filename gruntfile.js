module.exports = grunt => {
    grunt.initConfig({
        babel: {
            options: {
                presets: ['env']
            },
            broadcaster: {
                files: [{expand: true,src: ['**/*.js'],dest: 'dist/broadcaster_build',cwd:'dist/broadcaster_build'}]
            },
            peer: {
                files: [{expand: true,src: ['**/*.js'],dest: 'dist/peer_build',cwd:'dist/peer_build'}]
            },
            server: {
                files: [{expand: true,src: ['**/*.js'],dest: 'dist/server_build',cwd:'dist/server_build'}]
            }
        },
        clean:{
            broadcaster:['dist/broadcaster_build'],
            server:['dist/server_build'],
            peer:['dist/peer_build']
        },
        copy:{
            broadcaster:{
                files: [
                    {expand: true,cwd: 'src/core/', src: ['broadcaster/**'], dest: 'dist/broadcaster_build/core'},
                    {expand: true,cwd: 'src/lib/', src: ['**'], dest: 'dist/broadcaster_build/lib'},
                    {expand: true,cwd: 'src/database/', src: ['**'], dest: 'dist/broadcaster_build/database/'},
                    {expand: true,cwd: 'src/config/', src: ['**'], dest: 'dist/broadcaster_build/config'}
                  ]
            },
            server:{
                files: [
                    {expand: true,cwd: 'src/core/', src: ['server/**'], dest: 'dist/server_build/core'},
                    {expand: true,cwd: 'src/lib/', src: ['**'], dest: 'dist/server_build/lib'},
                    {expand: true,cwd: 'src/database/', src: ['**'], dest: 'dist/server_build/database/'},
                    {expand: true,cwd: 'src/config/', src: ['**'], dest: 'dist/server_build/config'}
                  ]
            },
            peer:{
                files: [
                    {expand: true,cwd: 'src/core/', src: ['peer/**'], dest: 'dist/peer_build/core'},
                    {expand: true,cwd: 'src/lib/', src: ['**'], dest: 'dist/peer_build/lib'},
                    {expand: true,cwd: 'src/database/', src: ['**'], dest: 'dist/peer_build/database/'},
                    {expand: true,cwd: 'src/config/', src: ['**'], dest: 'dist/peer_build/config'}
                  ]
            }
        },
        execute: {
            dev: {
                src: ['src/start.js']
            }
        },
        uglify:{
            broadcaster:{
                options: {
                    sourceMap:true,
                    mangle:true
                },
                files: [{
                    expand: true,
                    cwd: 'dist/broadcaster_build',
                    src: '**/*.js',
                    dest: 'dist/broadcaster_build'
                  }]
            },
            peer:{
                options: {
                    sourceMap:true,
                    mangle:true
                },
                files: [{
                    expand: true,
                    cwd: 'dist/peer_build',
                    src: '**/*.js',
                    dest: 'dist/peer_build'
                  }]
            },
            server:{
                options: {
                    sourceMap:true,
                    mangle:true
                },
                files: [{
                    expand: true,
                    cwd: 'dist/server_build',
                    src: '**/*.js',
                    dest: 'dist/server_build'
                  }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-execute');

    /** Dev tasks */
    grunt.registerTask('dev', ['execute:dev']);

    /** Dist build tasks */
    grunt.registerTask('build_broadcaster', ['clean:broadcaster', 'copy:broadcaster', 'babel:broadcaster', 'uglify:broadcaster']);
    grunt.registerTask('build_peer', ['clean:peer', 'copy:peer', 'babel:peer', 'uglify:peer']);
    grunt.registerTask('build_server', ['clean:server', 'copy:server', 'babel:server', 'uglify:server']);

    grunt.registerTask('build_all', ['build_broadcaster', 'build_peer', 'build_server']);    

    /** Run by default */
    grunt.registerTask('default', ['dev']);
}