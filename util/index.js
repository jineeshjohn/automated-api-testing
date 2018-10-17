class ManageStatus503 {
    constructor(docker, find){
        this.docker = docker;
        this.docker.listContainers(function (err, containers) {
            const container = find(containers, {Names: ['/db_db2_1'] });
            if(container){
                this.containerWrap = docker.getContainer(container.Id);
            };
        });
    }
    stopContainer() {
        console.log("GGGG:" , this.containerWrap);
        this.containerWrap.stop();
    }
    restartContainer() {
        this.containerWrap.restart();
    }
}


module.exports = ManageStatus503;

