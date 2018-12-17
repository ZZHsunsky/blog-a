
const handle = {
    view : null,

    setView : (view) => {
        this.view = view;
        // console.log("init navHandle");
    },

    setClassName : (className) => {
        if(this.view){
            if(this.view.state.className !== className){
                this.view.setState({className})
            }
        }
    }
}

export default handle;