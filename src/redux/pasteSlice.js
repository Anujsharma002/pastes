import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
const initialState = {
  pastes:localStorage.getItem("pastes")?JSON.parse(localStorage.getItem("pastes")) : []
}
export const pasteSlice = createSlice({
  name: 'pastes',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes)); // ✅ Fix applied
      toast.success("Paste successfully created");
    },
    updateToPaste: (state,action) => {
      const paste = action.payload
      const index = state.pastes.findIndex(
        (item) => item._id === paste._id
      );
      if(index >=0){
        state.pastes[index] = paste;
        localStorage.setItem('pastes',JSON.stringify(state.pastes));
        toast.success("Paste Updated");
      }
    },
    resetAllPaste:(state,action)=>{
        state.pastes = [];
        localStorage.setItem('pastes');
    },
    removeToPaste: (state, action) => {
      const paste = action.payload;
  
      // Debugging logs
      console.log("Action Payload:", paste);
      console.log("State Pastes:", state.pastes);
      console.log("IDs in State:", state.pastes.map(p => p._id));
      console.log("ID to Delete:", paste._id);
  
      // Ensure consistent data type before comparison
      const index = state.pastes.findIndex(
          (item) => String(item._id) === String(paste._id)
      );
  
      console.log("Found Index:", index);
  
      if (index >= 0) {
          state.pastes.splice(index, 1);
          localStorage.setItem('pastes', JSON.stringify(state.pastes));
          toast.success("Paste Deleted");
      } else {
          console.warn("Error: Paste not found. Unable to delete.");
      }
  },
  },
})
// Action creators are generated for each case reducer function
export const { addToPastes, updateToPaste, resetAllPaste,removeToPaste } = pasteSlice.actions

export default pasteSlice.reducer



