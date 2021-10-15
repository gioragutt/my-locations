const rewire = require("rewire")
const Locations = rewire("./Locations")
const mapStateToProps = Locations.__get__("mapStateToProps")
// @ponicode
describe("mapStateToProps", () => {
    test("0", () => {
        let param2 = [[true, true, true], [false, false, false], [false, false, false]]
        let callFunction = () => {
            mapStateToProps({ locations: { items: 256, selected: false }, categories: { items: 64, filter: false } }, param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let param2 = [[false, true, true], [true, false, false], [false, false, true]]
        let callFunction = () => {
            mapStateToProps({ locations: { items: 10, selected: true }, categories: { items: 32, filter: false } }, param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let param2 = [[true, false, true], [false, true, false], [true, true, true]]
        let callFunction = () => {
            mapStateToProps({ locations: { items: 256, selected: true }, categories: { items: 256, filter: false } }, param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let param2 = [[false, false, false], [false, true, false], [false, false, false]]
        let callFunction = () => {
            mapStateToProps({ locations: { items: 64, selected: true }, categories: { items: 32, filter: true } }, param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let param2 = [[true, false, true], [false, false, true], [false, false, false]]
        let callFunction = () => {
            mapStateToProps({ locations: { items: 0, selected: true }, categories: { items: 0, filter: false } }, param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            mapStateToProps({ locations: { items: -Infinity, selected: false }, categories: { items: -Infinity, filter: false } }, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
