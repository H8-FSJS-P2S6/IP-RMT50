module.exports = {
    apps: [{
        name: "clipperDevelopment",
        script: "./bin/www",
        env: {
            NODE_ENV: 'production',
            PORT: 80,
            YOUTUBE_API_KEY: "AIzaSyAVfGRhhUGxfkMSoc2TAqd1cJvTP8Jexfs",
            GEMINI_API_KEY: "AIzaSyBoo6QsyOUPU1u2y9Y3lf-VCLliHF6AbzE",
            CLIENT_ID: "612420835466-gvfg8rq8usad778t9aadqv897sakg0hg.apps.googleusercontent.com",
            HOST: "0.0.0.0"
        }
    }]
}