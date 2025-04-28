export const catchError = async (res, code, err)=>{
    return res.status(code).json({
        stastusCode: code,
        message: err
    });
}