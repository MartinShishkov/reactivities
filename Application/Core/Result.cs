using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
  public class Result<T>
  {
    private Result(bool successful, T value, string error)
    {
      Successful = successful;
      Value = value;
      Error = error;
    }

    public bool Successful { get; }

    public T Value { get; }

    public string Error { get; }

    public static Result<T> Success(T value)
    {
      return new Result<T>(true, value, "");
    }

    public static Result<T> Failure(string error)
    {
      return new Result<T>(false, default(T), error);
    }
  }
}
