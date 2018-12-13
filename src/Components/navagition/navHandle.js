
const handle = {
    view : null,

    setView : (view) => {
        this.view = view;
        // console.log("init navHandle");
    },

    setClassName : (className) => {
        if(this.view){
            // console.log(className);
            this.view.setState({className})
        }
    }
}

export default handle;