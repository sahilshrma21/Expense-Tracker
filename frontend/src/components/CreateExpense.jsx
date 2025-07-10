import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {  Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const CreateExpense = () => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const changeCategoryHandler = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/expense/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <form onSubmit={submitHandler}>
        <DialogTrigger asChild>
          <Button>Add Expense</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
            <DialogDescription>
              Create Expense here and mark when done.
            </DialogDescription>
          </DialogHeader>
          <form action="">
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={changeEventHandler}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  placeholder="₹"
                  value={formData.amount}
                  onChange={changeEventHandler}
                />
              </div>
              <Select id="category" name="category" onValueChange={changeCategoryHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel value="category">Category</SelectLabel>
                    <SelectItem value="Rent">Rent</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Shopping">Shopping</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">
                  <Loader2 className="mr-2 h-4 animate-spin">
                    Please Wait...
                  </Loader2>
                </Button>
              ) : (
                <>
                  <DialogClose asChild>
                    <Button>Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Add</Button>
                </>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateExpense;
