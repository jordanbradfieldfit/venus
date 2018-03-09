module.exports = grunt => {
    grunt.initConfig({
        execute: {
            dev: {
                src: ['src/start.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-execute');

    grunt.registerTask('dev', ['execute:dev']);


    grunt.registerTask('default', ['dev']);
}