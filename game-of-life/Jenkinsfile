pipeline {
    agent any
    tools {
        // Install the Maven version configured as "M3" and add it to the path.
        maven "maven-demo"
    }
    stages {
        stage ('Compile Stage') {

            steps {
                    //git 'https://github.com/jglick/simple-maven-project-with-tests.git'
                    sh 'mvn clean compile'
                }
            }

        stage ('Testing Stage') {

            steps {
                //git 'https://github.com/jglick/simple-maven-project-with-tests.git'
                    sh 'mvn test'
                }
            }
        


        stage ('Deployment Stage') {
            steps {
                //git 'https://github.com/jglick/simple-maven-project-with-tests.git'
                    sh 'mvn package'
                }
            }
        }
    }
